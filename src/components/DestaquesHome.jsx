"use client";

import { useEffect, useMemo, useState } from "react";
import CardProfissional from "@/components/CardProfissional";
import { PROFISSIONAIS_MOCK } from "@/lib/mocks";
import { isSupabaseConfigurado } from "@/lib/supabase";
import { obterProfissionais } from "@/services/profissionais.service";

export default function DestaquesHome() {
  const modoDemo = !isSupabaseConfigurado();
  const [reais, setReais] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (modoDemo) return;
    const buscar = async () => {
      const { data, error } = await obterProfissionais({});
      if (error) throw error;
      setReais((data || []).slice(0, 3));
    };
    buscar().catch(() => setErro("Falha ao carregar destaques. Tente novamente."));
  }, [modoDemo]);

  const lista = useMemo(
    () => (modoDemo ? PROFISSIONAIS_MOCK.slice(0, 3) : reais),
    [modoDemo, reais],
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Profissionais em destaque</h2>
      {erro && <p className="text-red-600 text-sm mb-4">{erro}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lista.map((p) => (
          <CardProfissional key={p.id} profissional={p} />
        ))}
      </div>
    </section>
  );
}
