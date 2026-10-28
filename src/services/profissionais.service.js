import { supabase } from "@/lib/supabase";

// Lista profissionais ativos, com filtros opcionais.
export async function obterProfissionais({ categoria, cidade } = {}) {
  if (!supabase) return { data: [], error: new Error("Supabase não configurado") };
  let query = supabase
    .from("profissionais")
    .select("*")
    .eq("ativo", true);
  if (categoria) query = query.eq("categoria", categoria);
  if (cidade) query = query.ilike("cidade", `%${cidade}%`);
  const { data, error } = await query.order("nome");
  return { data: data || [], error };
}

export async function obterProfissionalPorId(id) {
  if (!supabase) return { data: null, error: new Error("Supabase não configurado") };
  const { data, error } = await supabase
    .from("profissionais")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function obterPortfolio(profissionalId) {
  if (!supabase) return { data: [], error: new Error("Supabase não configurado") };
  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .eq("profissional_id", profissionalId);
  return { data: data || [], error };
}

export async function obterReferencias(profissionalId) {
  if (!supabase) return { data: [], error: new Error("Supabase não configurado") };
  const { data, error } = await supabase
    .from("referencias")
    .select("*")
    .eq("profissional_id", profissionalId)
    .eq("status_moderacao", "aprovado");
  return { data: data || [], error };
}