// Categorias iniciais do MVP (decisão confirmada em 2026-10-28).
export const CATEGORIAS_PADRAO = ["Reformas", "Computadores", "Celulares"];

export function categoriaValida(valor) {
  return CATEGORIAS_PADRAO.includes(valor) ? valor : "";
}
