import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Manutenção e Serviços — Catálogo de profissionais em Serra dos Aimorés",
  description:
    "Encontre profissionais de manutenção, consertos e reformas em Serra dos Aimorés. Portfólios, referências e contato direto.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}