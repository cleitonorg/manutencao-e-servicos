"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CardProfissional from "@/components/CardProfissional";
import FiltroProfissionais from "@/components/FiltroProfissionais";
import { PROFISSIONAIS_MOCK } from "@/lib/mocks";
import { CATEGORIAS_PADRAO, categoriaValida } from "@/lib/categorias";
import { isSupabaseConfigurado } from "@/lib/supabase";
import { obterProfissionais } from "@/services/profissionais.service";

export default function ProfissionaisPage() {
  return (
    <Suspense fallback={<p className="text-gray-500">Carregando filtros…</p>}>
      <CatalogoProfissionais />
    </Suspense>
  );
}

function CatalogoProfissionais() {
  const searchParams = useSearchParams();
  const modoDemo = !isSupabaseConfigurado();
  const [filtro, setFiltro] = useState(() => ({
    categoria: categoriaValida(searchParams.get("categoria")),
    cidade: "",
  }));
  const [profissionais, setProfissionais] = useState([]);
  const [erro, setErro] = useState("");

  const { categoria, cidade } = filtro;

  const listaDemo = useMemo(
    () =>
      PROFISSIONAIS_MOCK.filter(
        (p) =>
          (!categoria || p.categoria === categoria) &&
          (!cidade || p.cidade.toLowerCase().includes(cidade.toLowerCase())),
      ),
    [categoria, cidade],
  );

  useEffect(() => {
    if (modoDemo) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErro("");
    const buscar = async () => {
      const { data, error } = await obterProfissionais({ categoria, cidade });
      if (error) throw error;
      setProfissionais(data || []);
    };
    buscar().catch(() => setErro("Não foi possível carregar os profissionais. Tente novamente."));
  }, [categoria, cidade, modoDemo]);

  const lista = modoDemo ? listaDemo : profissionais;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Profissionais</h1>
      <FiltroProfissionais
        categorias={CATEGORIAS_PADRAO}
        valorInicial={categoria}
        onFiltrar={(f) => setFiltro((prev) => ({ ...prev, ...f }))}
      />
      {erro && <p className="text-red-600 text-sm mb-4">{erro}</p>}
      {modoDemo && !erro && (
        <p className="text-gray-500 text-sm mb-4">
          Modo demonstração: configure o Supabase para ver dados reais.
        </p>
      )}
      {lista.length === 0 ? (
        <p className="text-gray-500">
          Nenhum profissional encontrado para este filtro em Serra dos Aimorés.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lista.map((p) => (
            <CardProfissional key={p.id} profissional={p} />
          ))}
        </div>
      )}
    </div>
  );
}
