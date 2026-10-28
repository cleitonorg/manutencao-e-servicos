import Link from "next/link";

export default function CardProfissional({ profissional }) {
  const { id, nome, categoria, cidade, foto_url, valor_base } = profissional;
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        {foto_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={foto_url} alt={nome} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">Sem foto</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{nome}</h3>
        <p className="text-sm text-blue-600">{categoria}</p>
        <p className="text-sm text-gray-500 mt-1">{cidade}</p>
        {valor_base && (
          <p className="text-sm text-gray-700 mt-2">A partir de R$ {valor_base}</p>
        )}
        <Link
          href={`/profissionais/${id}`}
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          Ver perfil →
        </Link>
      </div>
    </div>
  );
}