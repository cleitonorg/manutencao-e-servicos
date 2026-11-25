import Link from "next/link";
import AbaCategorias from "@/components/AbaCategorias";
import { CATEGORIAS_PADRAO as CATEGORIAS } from "@/lib/categorias";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            Encontre profissionais de confiança em Serra dos Aimorés
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Catálogo de manutenção, consertos e reformas. Veja portfólios,
            referências e entre em contato direto com o profissional.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/profissionais"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              Buscar profissional
            </Link>
            <Link
              href="/como-funciona"
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Como funciona
            </Link>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Categorias de serviço</h2>
        <AbaCategorias categorias={CATEGORIAS} />
      </section>

      {/* Profissionais em destaque (mock) */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Profissionais em destaque</h2>
        <p className="text-gray-500">
          Em breve: lista de profissionais carregada do banco de dados.
        </p>
      </section>

      {/* Depoimentos em vídeo (mock) */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Depoimentos em vídeo</h2>
          <p className="text-gray-500">
            Em breve: vídeos de clientes indicando serviços prestados.
          </p>
        </div>
      </section>
    </div>
  );
}