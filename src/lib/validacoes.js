// Validações simples reutilizáveis para formulários do MVP.
import { CATEGORIAS_PADRAO } from "./categorias.js";

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

export function validarPedidoOrcamento(form) {
  const erros = {};
  if (!validarObrigatorio(form?.nome_cliente)) erros.nome_cliente = "Informe seu nome.";
  if (!validarTelefone(form?.telefone)) erros.telefone = "Informe um telefone com DDD.";
  if (!validarObrigatorio(form?.descricao_servico)) erros.descricao_servico = "Descreva o servico.";
  return erros;
}

export function validarSolicitacaoCadastro(form) {
  const erros = {};
  if (!validarObrigatorio(form?.nome)) erros.nome = "Informe seu nome.";
  if (!CATEGORIAS_PADRAO.includes(form?.categoria)) erros.categoria = "Selecione uma categoria.";
  if (!validarObrigatorio(form?.cidade)) erros.cidade = "Informe sua cidade.";
  if (!validarTelefone(form?.telefone_whatsapp)) erros.telefone_whatsapp = "Informe um WhatsApp com DDD.";
  return erros;
}