import Link from "next/link";
import FormOrcamento from "@/components/FormOrcamento";

// Dados de exemplo (mock)
const PROFISSIONAIS = {
  1: { id: 1, nome: "João Silva" },
  2: { id: 2, nome: "Maria Souza" },
  3: { id: 3, nome: "Carlos Lima" },
};

export default function OrcamentoPage({ params }) {
  const prof = PROFISSIONAIS[params.id];

  if (!prof) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-gray-500">Profissional não encontrado.</p>
        <Link href="/profissionais" className="text-blue-600 hover:underline mt-4 inline-block">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Solicitar orçamento</h1>
      <p className="text-gray-600 mb-6">
        Para: <span className="font-semibold">{prof.nome}</span>
      </p>
      <FormOrcamento profissionalId={prof.id} nomeProfissional={prof.nome} />
    </div>
  );
}