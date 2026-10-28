"use client";

import Link from "next/link";

export default function AbaCategorias({ categorias = [] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categorias.map((cat) => (
        <Link
          key={cat}
          href={`/profissionais?categoria=${encodeURIComponent(cat)}`}
          className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-blue-50 hover:border-blue-300 transition"
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}