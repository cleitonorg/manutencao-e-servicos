"use client";

import { useState } from "react";
import { validarSolicitacaoCadastro } from "@/lib/validacoes";
import { enviarSolicitacaoCadastro } from "@/services/orcamentos.service";

export default function CadastroProfissionalPage() {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    cidade: "",
    telefone_whatsapp: "",
    descricao: "",
  });
  const [status, setStatus] = useState("idle");
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    if (!form.nome || !form.categoria || !form.cidade || !form.telefone_whatsapp) {
      setErro("Preencha os campos obrigatórios.");
      return;
    }
    const erros = validarSolicitacaoCadastro(form);
    if (Object.keys(erros).length > 0) {
      setErro(Object.values(erros)[0]);
      return;
    }
    setStatus("enviando");
    try {
      const { error } = await enviarSolicitacaoCadastro(form);
      if (error) throw error;
      setStatus("sucesso");
    } catch {
      setStatus("erro");
      setErro("Não foi possível enviar. Tente novamente.");
    }
  };

  if (status === "sucesso") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6">
          <p className="font-semibold">Solicitação enviada com sucesso.</p>
          <p className="text-sm mt-2">
            Seus dados serão analisados e, se aprovados, você aparecerá no catálogo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cadastro de profissional</h1>
      <p className="text-gray-600 mb-6">
        Preencha seus dados para solicitar participação no catálogo. Após
        aprovação, seu perfil será publicado.
      </p>
      {erro && <p className="text-red-600 text-sm mb-4">{erro}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome *</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoria *</label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="Reformas">Reformas</option>
            <option value="Computadores">Computadores</option>
            <option value="Celulares">Celulares</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cidade *</label>
          <input
            type="text"
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Telefone / WhatsApp *
          </label>
          <input
            type="tel"
            name="telefone_whatsapp"
            value={form.telefone_whatsapp}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={status === "enviando"}
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "enviando" ? "Enviando..." : "Enviar solicitação"}
        </button>
      </form>
    </div>
  );
}