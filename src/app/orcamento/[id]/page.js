import { Suspense } from "react";
import Link from "next/link";
import FormOrcamento from "@/components/FormOrcamento";
import { isSupabaseConfigurado } from "@/lib/supabase";
import { obterProfissionalPorId } from "@/services/profissionais.service";
import { NOMES_PROFISSIONAIS_MOCK } from "@/lib/mocks";

export default function OrcamentoPage({ params }) {
  return (
    <Suspense fallback={<CarregandoFormulario />}>
      <FormularioOrcamento params={params} />
    </Suspense>
  );
}

function CarregandoFormulario() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <p className="text-gray-500">Carregando formulário…</p>
    </div>
  );
}

async function FormularioOrcamento({ params }) {
  const { id } = await params;
  let prof = null;
  if (isSupabaseConfigurado()) {
    const { data, error } = await obterProfissionalPorId(id);
    if (!error && data) prof = data;
  } else {
    prof = NOMES_PROFISSIONAIS_MOCK[id];
  }

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
