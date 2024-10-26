import Link from "next/link";
import "../app/styles/globals.css";

export default function Home() {
  return (
    <div className="box">
      <h1 className="title">Olá, bem vindo ao Sistema de Cadastro de Pessoas WKM</h1>
      <p className="text">Clique no botão abaixo para realizar o acesso:</p>
      <Link href="/pessoa/add">
        <button className="btn">Acessar</button>
      </Link>
    </div>
  );
}
