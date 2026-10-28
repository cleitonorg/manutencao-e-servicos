import { supabase } from "@/lib/supabase";

export async function obterCategorias() {
  if (!supabase) return { data: [], error: new Error("Supabase não configurado") };
  const { data, error } = await supabase.from("categorias").select("*").order("nome");
  return { data: data || [], error };
}