# Desafio Tecnico - Working Minds

Projeto desenvolvido como parte de um processo seletivo para Working Minds.
No frontend, foi utilizada a tecnologia Next.js, um framework da biblioteca React.js, que permite o cadastro e a exibição de informações de pessoas, utilizando a API CMS Strapi rodando localmente.

## Tecnologias Utilizadas

- Next.js - Framework React para renderização SSR e SSG.
- TypeScript - Adiciona tipagem estática.
- Tailwind - Estilização utility first CSS.
- Zod - Biblioteca para validação e definição de esquemas com foco em TypeScript.
- Strapi v5 - CMS headless que facilita a criação e gestão de conteúdo.
- Docker - Plataforma de containerização que simplifica a criação, distribuição e execução de aplicações em ambientes isolados.

## Instalação e Execução

## Pré-requisitos

- Node.js (16 ou superior)
- npm
- PostgreSQL (instalado e em execução)
- Backend rodando localmente através das APIs do Strapi (instruções disponíveis no repositório abaixo):

[Repositório da API](https://github.com/erickdc27/wkm-api)

# Passo a passo para executar o projeto

## 1. Clone o repositório

```bash
git clone (https://github.com/erickdc27/wkm-next.git)
cd wkm-next
```

## 2. Instale as dependências

```bash
npm install
```

## 4. Inicie a aplicação

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

## Rotas da API utilizadas

As seguintes rotas da API são consumidas pelo projeto:

- `GET /estados` - Retorna a lista de estados.
- `GET /estados/{documentId}` - Retorna um estado específico pelo `documentId`, incluindo suas cidades relacionadas.
- `GET /pessoas/{documentId}` - Retorna uma pessoa específica pelo `documentId`.
- `POST /pessoas` - Cria uma nova pessoa no banco de dados.

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte forma:

- `src/app/page` - Página inicial da aplicação.
- `src/app/pessoa/add` - Página do formulário de cadastro de pessoa.
- `src/app/pessoa/[id]` - Página de exibição dos dados cadastrados da pessoa.
- `src/app/styles` - Estilos globais (tailwind.css).
- `src/app/services` - Serviços para integração com a API (axios).
- `src/app/interface` - Validações (zod).
- `src/app/schemas` - Validações (zod).

## Tecnologias Utilizadas

- **React JS**
- **Next.js**
- **Axios** - Para requisições HTTP.
- **Tailwind** - Para estilização.
- **Zod** - Para validação de dados.
- **TypeScript** - Para tipagem estática.

## Funcionalidades

- Cadastro de pessoas através de um formulário.
- Exibição dos dados da pessoa cadastrada.
- Validação de formulários e campos obrigatórios.
- Redirecionamento automático após o cadastro.
