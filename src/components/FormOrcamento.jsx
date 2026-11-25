"use client";

import { useState } from "react";
import { validarPedidoOrcamento } from "@/lib/validacoes";
import { enviarPedidoOrcamento } from "@/services/orcamentos.service";

export default function FormOrcamento({ profissionalId, nomeProfissional }) {
  const [form, setForm] = useState({
    nome_cliente: "",
    telefone: "",
    descricao_servico: "",
    mensagem: "",
  });
  const [status, setStatus] = useState("idle"); // idle | enviando | sucesso | erro
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    if (!form.nome_cliente || !form.telefone || !form.descricao_servico) {
      setErro("Preencha os campos obrigatórios.");
      return;
    }
    const erros = validarPedidoOrcamento(form);
    if (Object.keys(erros).length > 0) {
      setErro(Object.values(erros)[0]);
      return;
    }
    setStatus("enviando");
    try {
      const { error } = await enviarPedidoOrcamento({
        ...form,
        profissional_id: profissionalId,
      });
      if (error) throw error;
      setStatus("sucesso");
    } catch {
      setStatus("erro");
      setErro("Não foi possível enviar sua solicitação. Tente novamente.");
    }
  };

  if (status === "sucesso") {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6">
        <p className="font-semibold">Orçamento enviado com sucesso.</p>
        <p className="text-sm mt-2">
          O profissional {nomeProfissional} entrará em contato.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {erro && (
        <p className="text-red-600 text-sm">{erro}</p>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">
          Nome do cliente *
        </label>
        <input
          type="text"
          name="nome_cliente"
          value={form.nome_cliente}
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
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Descrição do serviço *
        </label>
        <textarea
          name="descricao_servico"
          value={form.descricao_servico}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Mensagem / observações
        </label>
        <textarea
          name="mensagem"
          value={form.mensagem}
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
        {status === "enviando" ? "Enviando..." : "Enviar pedido de orçamento"}
      </button>
    </form>
  );
}