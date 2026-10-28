import { supabase } from "@/lib/supabase";

export async function enviarPedidoOrcamento(pedido) {
  if (!supabase) return { data: null, error: new Error("Supabase não configurado") };
  const { data, error } = await supabase.from("orcamentos").insert([pedido]).select();
  return { data, error };
}

export async function enviarSolicitacaoCadastro(profissional) {
  if (!supabase) return { data: null, error: new Error("Supabase não configurado") };
  const { data, error } = await supabase
    .from("solicitacoes_cadastro")
    .insert([profissional])
    .select();
  return { data, error };
}