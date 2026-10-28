import Link from "next/link";
import GaleriaPortfolio from "@/components/GaleriaPortfolio";

// Dados de exemplo (mock)
const PROFISSIONAIS = {
  1: {
    id: 1,
    nome: "João Silva",
    categoria: "Reformas",
    cidade: "Serra dos Aimorés",
    bairro: "Centro",
    telefone_whatsapp: "5533999999999",
    descricao:
      "Profissional com mais de 10 anos de experiência em reformas residenciais.",
    valor_base: "50,00",
    portfolio: [
      { id: 1, titulo: "Reforma de banheiro", imagem_url: "" },
      { id: 2, titulo: "Pintura residencial", imagem_url: "" },
    ],
    referencias: [
      {
        id: 1,
        nome_cliente: "Ana P.",
        comentario: "Excelente trabalho, pontual e caprichoso.",
        nota: 5,
      },
    ],
  },
};

export default function ProfissionalPerfilPage({ params }) {
  const prof = PROFISSIONAIS[params.id];

  if (!prof) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-gray-500">Profissional não encontrado ou indisponível.</p>
        <Link href="/profissionais" className="text-blue-600 hover:underline mt-4 inline-block">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  const whatsappLink = prof.telefone_whatsapp
    ? `https://wa.me/${prof.telefone_whatsapp}?text=${encodeURIComponent(
        `Olá ${prof.nome}, vi seu perfil no Manutenção e Serviços e gostaria de solicitar um orçamento.`
      )}`
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-gray-400 text-sm">Foto</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{prof.nome}</h1>
            <p className="text-blue-600">{prof.categoria}</p>
            <p className="text-gray-500 text-sm mt-1">
              {prof.bairro ? `${prof.bairro}, ` : ""}
              {prof.cidade}
            </p>
            {prof.valor_base && (
              <p className="text-gray-700 mt-2">A partir de R$ {prof.valor_base}</p>
            )}
            <p className="mt-4 text-gray-700">{prof.descricao}</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/orcamento/${prof.id}`}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 text-center"
              >
                Solicitar orçamento
              </Link>
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 text-center"
                >
                  Falar no WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Portfólio */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Portfólio</h2>
        <GaleriaPortfolio itens={prof.portfolio} />
      </section>

      {/* Referências */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Referências e recomendações</h2>
        {prof.referencias.length === 0 ? (
          <p className="text-gray-500">Nenhuma referência cadastrada.</p>
        ) : (
          <div className="space-y-4">
            {prof.referencias.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <p className="font-semibold">{r.nome_cliente}</p>
                <p className="text-yellow-500 text-sm">{"★".repeat(r.nota)}</p>
                <p className="text-gray-700 mt-2">{r.comentario}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}