import Link from "next/link";
import "../app/styles/globals.css";

export default function Home() {
  return (
    <div className="isolate bg-white px-6 py-2 sm:py-4 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Olá, bem-vindo ao Sistema de Cadastro de Pessoas WKM
      </h1>
      <p className="mt-2 text-lg leading-8 text-gray-600 text-center">
        Clique no botão abaixo para realizar o acesso:
      </p>
      <Link href="/pessoa/add">
        <button className="mt-4 block mx-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Acessar Sistema
        </button>
      </Link>
    </div>
  );
}
