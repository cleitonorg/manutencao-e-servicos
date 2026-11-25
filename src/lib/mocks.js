// Mocks locais — substituito por busca no Supabase quando configurado.

export const PROFISSIONAIS_MOCK = [
  {
    id: 1,
    nome: "João Silva",
    categoria: "Reformas",
    cidade: "Serra dos Aimorés",
    foto_url: "",
    valor_base: "50,00",
  },
  {
    id: 2,
    nome: "Maria Souza",
    categoria: "Computadores",
    cidade: "Serra dos Aimorés",
    foto_url: "",
    valor_base: "80,00",
  },
  {
    id: 3,
    nome: "Carlos Lima",
    categoria: "Celulares",
    cidade: "Serra dos Aimorés",
    foto_url: "",
    valor_base: "60,00",
  },
];

export const PERFIS_MOCK = {
  1: {
    id: 1,
    nome: "João Silva",
    categoria: "Reformas",
    cidade: "Serra dos Aimorés",
    bairro: "Centro",
    telefone_whatsapp: "5533999999999",
    descricao: "Profissional com mais de 10 anos de experiência em reformas residenciais.",
    valor_base: "50,00",
    portfolio: [
      { id: 1, titulo: "Reforma de banheiro", imagem_url: "" },
      { id: 2, titulo: "Pintura residencial", imagem_url: "" },
    ],
    referencias: [
      { id: 1, nome_cliente: "Ana P.", comentario: "Excelente trabalho, pontual e caprichoso.", nota: 5 },
    ],
  },
};

export const NOMES_PROFISSIONAIS_MOCK = {
  1: { id: 1, nome: "João Silva" },
  2: { id: 2, nome: "Maria Souza" },
  3: { id: 3, nome: "Carlos Lima" },
};
