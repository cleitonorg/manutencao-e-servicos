import Link from "next/link";
import AbaCategorias from "@/components/AbaCategorias";
import DestaquesHome from "@/components/DestaquesHome";
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

      <DestaquesHome />

      {/* Como funciona */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Como funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">1. Busque</h3>
            <p className="text-gray-600">
              Escolha a categoria e filtre por cidade, avaliação e disponibilidade.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Compare</h3>
            <p className="text-gray-600">
              Veja portfólios, referências e orçamentos de cada profissional.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Contrate</h3>
            <p className="text-gray-600">
              Entre em contato e combine o serviço diretamente com o profissional.
            </p>
          </div>
        </div>
      </section>

      {/* Precisa de um orçamento? */}
      <section className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-3">Precisa de um orçamento?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4">
          Envie sua necessidade e receba propostas de profissionais qualificados.
        </p>
        <Link
          href="/orcamento"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Solicitar orçamento
        </Link>
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