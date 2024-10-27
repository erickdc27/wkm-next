"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { pessoaSchema } from "../../schemas/schemas";
import { ICidade, IEstado, ApiError } from "../../interface/interfaces";
import "../../styles/globals.css";

const PessoaAdd = () => {
  const [cidades, setCidades] = useState<ICidade[]>([]);
  const [estados, setEstados] = useState<IEstado[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    estado: "",
    cidade: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/estados`
        );
        setEstados(response.data.data);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      }
    };
    fetchEstados();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEstadoChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const estadoId = event.target.value;
    setFormData({ ...formData, estado: estadoId, cidade: "" });

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/estados/${estadoId}`
      );

      const estado = response.data;

      setCidades(estado.cidades || []);
    } catch (error) {
      console.error("Erro ao carregar cidades:", error);
      setCidades([]);
    }
  };

  const validateForm = () => {
    const result = pessoaSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        errors[error.path[0] as string] = error.message;
      });
      return errors;
    }
    return {};
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/pessoas`,
          {
            data: {
              nome: formData.nome,
              email: formData.email,
              cidade: formData.cidade,
              estado: formData.estado,
            },
          }
        );

        const documentId = response.data.data.documentId;
        window.location.href = `/pessoa/${documentId}`;
      } catch (error) {
        console.error("Erro ao enviar o formulário", error);

        const apiError = error as { response?: { data?: ApiError } };

        if (apiError.response?.data?.error) {
          const validationErrors = apiError.response.data.error.details.errors;

          const emailError = validationErrors.find((err) =>
            err.path.includes("email")
          );
          if (emailError) {
            setErrors((prev) => ({
              ...prev,
              email: "Esse email já existe. Tente outro.",
            }));
          } else {
            setErrors({
              submit: "Erro ao cadastrar a pessoa. Tente novamente.",
            });
          }
        } else {
          setErrors({ submit: "Erro ao cadastrar a pessoa. Tente novamente." });
        }
      }
    }
  };

  return (
    <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          Nome
        </label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Seu Nome"
          required
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors.nome && (
          <span className="text-red-700">{errors.nome}</span>
        )}
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@gmail.com"
          required
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors.email && (
          <span className="text-red-700">{errors.email}</span>
        )}
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          Estado
        </label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleEstadoChange}
          required
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">Selecione seu estado</option>
          {estados.map((estado) => (
            <option key={estado.documentId} value={estado.documentId}>
              {estado.nome}
            </option>
          ))}
        </select>
        {errors.estado && (
          <span className="text-red-700">{errors.estado}</span>
        )}
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          Cidade
        </label>
        <select
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">Selecione sua cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.id}>
              {cidade.nome}
            </option>
          ))}
        </select>
        {errors.cidade && (
          <span className="text-red-700">{errors.cidade}</span>
        )}
      </div>

      <div className="flex justify-between">
        <button
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Cadastrar
        </button>
        <Link href="/">
          <button className="ml-2 block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            Sair
          </button>
        </Link>
      </div>
    </form>
  );
};

export default PessoaAdd;
