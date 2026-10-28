export default function ComoFuncionaPage() {
  const passos = [
    "Acesse o site e veja os profissionais por categoria.",
    "Filtre por localidade (Serra dos Aimorés) e área de atuação.",
    "Abra o perfil do profissional e veja o portfólio e as referências.",
    "Clique em \"Solicitar orçamento\" ou fale diretamente pelo WhatsApp.",
    "Receba a confirmação e aguarde o contato do profissional.",
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Como funciona</h1>
      <ol className="space-y-4">
        {passos.map((p, i) => (
          <li key={i} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              {i + 1}
            </span>
            <p className="text-gray-700 pt-1">{p}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}