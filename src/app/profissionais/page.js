"use client";

import { useState } from "react";
import CardProfissional from "@/components/CardProfissional";
import FiltroProfissionais from "@/components/FiltroProfissionais";

// Dados de exemplo (mock) — substituir por busca no Supabase
const PROFISSIONAIS_MOCK = [
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

const CATEGORIAS = ["Reformas", "Computadores", "Celulares"];

export default function ProfissionaisPage() {
  const [filtro, setFiltro] = useState({ categoria: "", cidade: "" });

  const filtrados = PROFISSIONAIS_MOCK.filter((p) => {
    const okCat = !filtro.categoria || p.categoria === filtro.categoria;
    const okCid =
      !filtro.cidade ||
      p.cidade.toLowerCase().includes(filtro.cidade.toLowerCase());
    return okCat && okCid;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Profissionais</h1>
      <FiltroProfissionais
        categorias={CATEGORIAS}
        onFiltrar={(f) => setFiltro((prev) => ({ ...prev, ...f }))}
      />
      {filtrados.length === 0 ? (
        <p className="text-gray-500">
          Nenhum profissional encontrado para este filtro em Serra dos Aimorés.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((p) => (
            <CardProfissional key={p.id} profissional={p} />
          ))}
        </div>
      )}
    </div>
  );
}