import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Manutenção e Serviços
        </Link>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/profissionais" className="hover:text-blue-600">
            Profissionais
          </Link>
          <Link href="/como-funciona" className="hover:text-blue-600">
            Como funciona
          </Link>
        </nav>
      </div>
    </header>
  );
}