import "dotenv/config";
import models, { sequelize } from "../src/models/index.js";

const curriculos = [
  {
    pessoa: {
      nome: "Mariana Costa",
      email: "mariana.costa.curriculo@example.com",
      telefone: "81999991111",
      resumo:
        "Desenvolvedora de software com experiência em aplicações web, APIs REST e bancos de dados relacionais.",
    },
    formacoes: [
      {
        instituicao: "Universidade Federal de Pernambuco",
        curso: "Ciência da Computação",
        dataInicio: "2018-02-01",
        dataFim: "2022-12-15",
      },
      {
        instituicao: "Instituto de Tecnologia Aplicada",
        curso: "Especialização em Desenvolvimento Web",
        dataInicio: "2023-03-01",
        dataFim: "2024-06-30",
      },
    ],
    experiencias: [
      {
        empresa: "Tech Recife",
        cargo: "Desenvolvedora Full Stack",
        descricao:
          "Desenvolvimento de APIs REST e interfaces web.",
        dataInicio: "2023-01-10",
        dataFim: null,
      },
      {
        empresa: "Soluções Digitais",
        cargo: "Desenvolvedora Júnior",
        descricao:
          "Manutenção de aplicações e integração com bancos de dados.",
        dataInicio: "2021-03-01",
        dataFim: "2022-12-20",
      },
    ],
    projetos: [
      {
        nome: "Sistema de Gestão de Tarefas",
        descricao:
          "Aplicação para organização e acompanhamento de tarefas.",
        tecnologias: "JavaScript, Node.js, PostgreSQL",
        link: "https://github.com",
      },
      {
        nome: "API de Biblioteca",
        descricao:
          "API REST para gerenciamento de livros e empréstimos.",
        tecnologias: "Java, Spring Boot, PostgreSQL",
        link: "https://github.com",
      },
    ],
    habilidades: [
      { nome: "JavaScript", nivel: "Avançado", categoria: "Técnica" },
      { nome: "Node.js", nivel: "Avançado", categoria: "Técnica" },
      { nome: "PostgreSQL", nivel: "Intermediário", categoria: "Técnica" },
      { nome: "Git", nivel: "Intermediário", categoria: "Técnica" },
      { nome: "Trabalho em equipe", nivel: "Avançado", categoria: "Comportamental" },
    ],
  },
  {
    pessoa: {
      nome: "Rafael Almeida",
      email: "rafael.almeida.curriculo@example.com",
      telefone: "81999992222",
      resumo:
        "Analista de sistemas com experiência em levantamento de requisitos, integração de sistemas e análise de dados.",
    },
    formacoes: [
      {
        instituicao: "Universidade de Pernambuco",
        curso: "Sistemas de Informação",
        dataInicio: "2017-02-01",
        dataFim: "2021-12-15",
      },
      {
        instituicao: "Centro de Formação Tecnológica",
        curso: "Análise de Dados",
        dataInicio: "2022-03-01",
        dataFim: "2022-11-30",
      },
    ],
    experiencias: [
      {
        empresa: "Recife Sistemas",
        cargo: "Analista de Sistemas",
        descricao:
          "Levantamento de requisitos e integração entre sistemas corporativos.",
        dataInicio: "2022-02-01",
        dataFim: null,
      },
      {
        empresa: "Data Nordeste",
        cargo: "Assistente de Tecnologia",
        descricao:
          "Suporte a sistemas internos e elaboração de relatórios.",
        dataInicio: "2020-01-15",
        dataFim: "2021-12-20",
      },
    ],
    projetos: [
      {
        nome: "Painel de Indicadores",
        descricao:
          "Dashboard para acompanhamento de indicadores operacionais.",
        tecnologias: "Python, SQL, Power BI",
        link: "https://github.com",
      },
      {
        nome: "Sistema de Controle de Estoque",
        descricao:
          "Aplicação para cadastro de produtos e movimentação de estoque.",
        tecnologias: "Java, PostgreSQL",
        link: "https://github.com",
      },
    ],
    habilidades: [
      { nome: "SQL", nivel: "Avançado", categoria: "Técnica" },
      { nome: "Python", nivel: "Intermediário", categoria: "Técnica" },
      { nome: "Power BI", nivel: "Avançado", categoria: "Técnica" },
      { nome: "Análise de requisitos", nivel: "Avançado", categoria: "Técnica" },
      { nome: "Comunicação", nivel: "Avançado", categoria: "Comportamental" },
    ],
  },
];

const cadastrarCurriculos = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com NeonDB realizada.");

    await sequelize.sync();

    for (const curriculo of curriculos) {
      const transacao = await sequelize.transaction();

      try {
        const pessoaExistente = await models.Pessoa.findOne({
          where: { email: curriculo.pessoa.email },
          transaction: transacao,
        });

        if (pessoaExistente) {
          console.log(
            `Currículo já cadastrado: ${curriculo.pessoa.nome}`
          );

          await transacao.rollback();
          continue;
        }

        const pessoa = await models.Pessoa.create(
          curriculo.pessoa,
          { transaction: transacao }
        );

        await models.Formacao.bulkCreate(
          curriculo.formacoes.map((formacao) => ({
            ...formacao,
            pessoaId: pessoa.id,
          })),
          { transaction: transacao }
        );

        await models.Experiencia.bulkCreate(
          curriculo.experiencias.map((experiencia) => ({
            ...experiencia,
            pessoaId: pessoa.id,
          })),
          { transaction: transacao }
        );

        await models.Projeto.bulkCreate(
          curriculo.projetos.map((projeto) => ({
            ...projeto,
            pessoaId: pessoa.id,
          })),
          { transaction: transacao }
        );

        await models.Habilidade.bulkCreate(
          curriculo.habilidades.map((habilidade) => ({
            ...habilidade,
            pessoaId: pessoa.id,
          })),
          { transaction: transacao }
        );

        await transacao.commit();

        console.log(
          `Currículo cadastrado: ${pessoa.nome} | ID: ${pessoa.id}`
        );
      } catch (error) {
        await transacao.rollback();
        throw error;
      }
    }

    console.log("Processo de cadastro finalizado.");
  } catch (error) {
    console.error("Erro ao cadastrar currículos:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

cadastrarCurriculos();