import Link from "next/link";

export default function OrcamentoIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Solicitar orçamento</h1>
      <p className="text-gray-600">
        Escolha um profissional no catálogo para solicitar um orçamento.
      </p>
      <Link
        href="/profissionais"
        className="mt-4 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Ver profissionais
      </Link>
    </div>
  );
}