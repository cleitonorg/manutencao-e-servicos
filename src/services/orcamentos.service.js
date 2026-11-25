import { supabase } from "@/lib/supabase";

export async function enviarPedidoOrcamento(pedido) {
  if (!supabase) return { data: null, error: new Error("Supabase não configurado") };
  const { error } = await supabase.from("orcamentos").insert([pedido]);
  return { data: error ? null : pedido, error };
}

export async function enviarSolicitacaoCadastro(solicitacao) {
  if (!supabase) return { data: null, error: new Error("Supabase não configurado") };
  const { error } = await supabase.from("solicitacoes_cadastro").insert([solicitacao]);
  return { data: error ? null : solicitacao, error };
}