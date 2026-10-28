// Validações simples reutilizáveis para formulários do MVP.

export function validarEmail(email) {
  if (!email) return true; // opcional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validarTelefone(telefone) {
  if (!telefone) return false;
  const digits = telefone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export function validarObrigatorio(valor) {
  return typeof valor === "string" ? valor.trim().length > 0 : !!valor;
}

export function validarComprimentoMaximo(valor, max) {
  if (!valor) return true;
  return valor.length <= max;
}