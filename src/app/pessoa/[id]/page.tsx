"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { IReadPessoa } from "../../interface/interfaces";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faCity,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const PessoaDetalhes = () => {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState<IReadPessoa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPessoa = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/pessoas/${id}`
          );
          setPessoa(response.data);
        } catch (error) {
          console.error("Erro ao buscar pessoa:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPessoa();
  }, [id]);

  if (loading) return <p className="text-center">Carregando...</p>;

  if (!pessoa) return <p className="text-center">Pessoa não encontrada.</p>;

  return (
    <div className="mx-auto mt-16 max-w-xl sm:mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Cadastro concluído
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">
          <FontAwesomeIcon icon={faUser} className="mr-2 inline" />
          Nome: <span className="font-semibold">{pessoa.nome}</span>
        </p>
        <p className="text-lg mb-4">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2 inline" />
          Email: <span className="font-semibold">{pessoa.email}</span>
        </p>
        <p className="text-lg mb-4">
          <FontAwesomeIcon icon={faLocationDot} className="mr-2 inline" />
          Estado: <span className="font-semibold">{pessoa.estado.nome}</span>
        </p>
        <p className="text-lg mb-4">
          <FontAwesomeIcon icon={faCity} className="mr-2 inline" />
          Cidade: <span className="font-semibold">{pessoa.cidade.nome}</span>
        </p>
        <Link href="/pessoa/add">
          <button className="mt-4 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Voltar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PessoaDetalhes;
