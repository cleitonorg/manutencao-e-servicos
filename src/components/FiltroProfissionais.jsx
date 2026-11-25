"use client";

export default function FiltroProfissionais({ categorias = [], valorInicial = "", onFiltrar }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <select
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        value={valorInicial}
        onChange={(e) => onFiltrar?.({ categoria: e.target.value })}
      >
        <option value="">Todas as categorias</option>
        {categorias.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Cidade / bairro"
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
        onChange={(e) => onFiltrar?.({ cidade: e.target.value })}
      />
    </div>
  );
}