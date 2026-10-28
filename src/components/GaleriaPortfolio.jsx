export default function GaleriaPortfolio({ itens = [] }) {
  if (itens.length === 0) {
    return <p className="text-gray-500">Nenhum trabalho no portfólio.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {itens.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="h-40 bg-gray-200 flex items-center justify-center">
            {item.imagem_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.imagem_url} alt={item.titulo} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-sm">Sem imagem</span>
            )}
          </div>
          <div className="p-3">
            <p className="font-medium text-sm">{item.titulo}</p>
            {item.descricao && (
              <p className="text-xs text-gray-500 mt-1">{item.descricao}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}