# Currículo Express — API REST

API REST desenvolvida para o gerenciamento de currículos profissionais, permitindo cadastrar, consultar, atualizar e excluir informações pessoais, formações acadêmicas, experiências profissionais, projetos e habilidades.

O projeto foi desenvolvido como atividade acadêmica, utilizando **Node.js, Express, Sequelize e PostgreSQL**, com banco de dados hospedado no **NeonDB** e aplicação publicada na **Vercel**.

## Links do projeto

- **API em produção:** https://curriculo-express-xi.vercel.app/
- **Repositório GitHub:** https://github.com/AdrianoValenca7/curriculo-express
- **Listagem de pessoas:** https://curriculo-express-xi.vercel.app/pessoas

## Tecnologias utilizadas

- Node.js — ambiente de execução JavaScript
- Express — framework para construção da API REST
- Sequelize — ORM para interação com o banco de dados
- PostgreSQL — banco de dados relacional
- NeonDB — hospedagem do PostgreSQL na nuvem
- Vercel — hospedagem da API
- Babel — suporte à sintaxe moderna do JavaScript
- Postman — testes dos endpoints
- Git e GitHub — versionamento e hospedagem do código-fonte

## Funcionalidades

A API oferece operações completas de CRUD (Create, Read, Update e Delete) para cinco entidades:

| Entidade | Descrição |
|---|---|
| Pessoa | Informações pessoais e resumo profissional |
| Formação | Histórico acadêmico |
| Experiência | Experiências profissionais |
| Projeto | Projetos desenvolvidos |
| Habilidade | Competências técnicas e comportamentais |

Cada pessoa pode possuir várias formações, experiências, projetos e habilidades.

Os relacionamentos foram implementados utilizando as associações `hasMany` e `belongsTo` do Sequelize.

## Estrutura do projeto

```text
curriculo-express/
├── api/
│   └── index.js
├── scripts/
│   └── seed.js
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── index.js
├── .babelrc
├── .env.sample
├── .gitignore
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

A aplicação utiliza uma organização em camadas para separar as responsabilidades:

- **Models:** definição das entidades e seus relacionamentos.
- **Services:** implementação das regras de negócio e acesso aos dados.
- **Controllers:** tratamento das requisições e respostas HTTP.
- **Routes:** definição dos endpoints da API.
- **Middlewares:** tratamento de erros e outras funcionalidades compartilhadas.
- **Utils:** funções e classes auxiliares.

## Endpoints da API

### Pessoas

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/pessoas` | Listar pessoas |
| GET | `/pessoas/:id` | Consultar pessoa pelo ID |
| POST | `/pessoas` | Cadastrar pessoa |
| PUT | `/pessoas/:id` | Atualizar pessoa |
| DELETE | `/pessoas/:id` | Excluir pessoa |

### Formações

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/formacoes` | Listar formações |
| GET | `/formacoes/:id` | Consultar formação |
| POST | `/formacoes` | Cadastrar formação |
| PUT | `/formacoes/:id` | Atualizar formação |
| DELETE | `/formacoes/:id` | Excluir formação |

### Experiências

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/experiencias` | Listar experiências |
| GET | `/experiencias/:id` | Consultar experiência |
| POST | `/experiencias` | Cadastrar experiência |
| PUT | `/experiencias/:id` | Atualizar experiência |
| DELETE | `/experiencias/:id` | Excluir experiência |

### Projetos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/projetos` | Listar projetos |
| GET | `/projetos/:id` | Consultar projeto |
| POST | `/projetos` | Cadastrar projeto |
| PUT | `/projetos/:id` | Atualizar projeto |
| DELETE | `/projetos/:id` | Excluir projeto |

### Habilidades

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/habilidades` | Listar habilidades |
| GET | `/habilidades/:id` | Consultar habilidade |
| POST | `/habilidades` | Cadastrar habilidade |
| PUT | `/habilidades/:id` | Atualizar habilidade |
| DELETE | `/habilidades/:id` | Excluir habilidade |

## Currículos de demonstração

O banco de dados contém dois currículos fictícios completos para demonstrar o funcionamento dos relacionamentos.

### Mariana Costa

Desenvolvedora de software com experiência em aplicações web, APIs REST e bancos de dados relacionais.

- 2 formações acadêmicas
- 2 experiências profissionais
- 2 projetos
- 5 habilidades

**Consultar currículo completo:**

https://curriculo-express-xi.vercel.app/pessoas/bed17c5c-1227-47da-9812-dc1b3b0daa73

### Rafael Almeida

Analista de sistemas com experiência em levantamento de requisitos, integração de sistemas e análise de dados.

- 2 formações acadêmicas
- 2 experiências profissionais
- 2 projetos
- 5 habilidades

**Consultar currículo completo:**

https://curriculo-express-xi.vercel.app/pessoas/75742644-fa2b-467d-869e-d28d0034ab02

Ao consultar uma pessoa pelo ID, a API retorna seus dados pessoais e as informações relacionadas.

## Como executar localmente

### Pré-requisitos

- Node.js e npm
- Banco PostgreSQL disponível
- Git

### 1. Clonar o repositório

```bash
git clone https://github.com/AdrianoValenca7/curriculo-express.git
cd curriculo-express
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e configure a conexão com o PostgreSQL:

```env
DATABASE_URL=postgresql://USUARIO:SENHA@HOST/BANCO?sslmode=require
NODE_ENV=development
PORT=3000
```

Substitua os valores ilustrativos pelas credenciais do seu banco de dados.

O arquivo `.env` não deve ser enviado ao GitHub, pois contém informações sensíveis.

### 4. Iniciar a aplicação

```bash
npm run dev
```

A API estará disponível localmente na porta configurada.

Exemplo:

```text
http://localhost:3000/pessoas
```

## Testes da API

Os endpoints foram testados utilizando o Postman, incluindo operações de criação, consulta, atualização e exclusão.

**Resultado da validação: 60 testes automatizados aprovados na API publicada no Vercel.**

Os testes utilizaram a seguinte URL base:

```text
https://curriculo-express-xi.vercel.app
```

A coleção Postman pode ser importada para reproduzir as requisições e verificar o funcionamento dos endpoints.

**Atenção:** operações POST, PUT e DELETE alteram os registros do banco de dados. Utilize registros de teste ao executar a coleção.

## Implantação

A API está publicada na Vercel, com integração ao repositório GitHub.

O banco PostgreSQL está hospedado no NeonDB e a conexão é configurada por meio da variável de ambiente `DATABASE_URL`.

O projeto utiliza uma função serverless para disponibilizar os endpoints Express.

## Autor

**Adriano Valença**

Projeto acadêmico desenvolvido para a disciplina de Serviços Web.

GitHub: https://github.com/AdrianoValenca7
