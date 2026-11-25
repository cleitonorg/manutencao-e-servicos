import test from "node:test";
import assert from "node:assert/strict";
import { validarPedidoOrcamento, validarSolicitacaoCadastro } from "../src/lib/validacoes.js";

test("pedido exige nome, telefone com DDD e descricao", () => {
  assert.deepEqual(validarPedidoOrcamento({ nome_cliente: "", telefone: "123", descricao_servico: "" }), {
    nome_cliente: "Informe seu nome.",
    telefone: "Informe um telefone com DDD.",
    descricao_servico: "Descreva o servico.",
  });
  assert.deepEqual(validarPedidoOrcamento({ nome_cliente: "Ana", telefone: "(31) 99999-9999", descricao_servico: "Conserto" }), {});
});

test("cadastro exige nome, categoria, cidade e WhatsApp", () => {
  assert.deepEqual(validarSolicitacaoCadastro({ nome: "", categoria: "", cidade: "", telefone_whatsapp: "123" }), {
    nome: "Informe seu nome.",
    categoria: "Selecione uma categoria.",
    cidade: "Informe sua cidade.",
    telefone_whatsapp: "Informe um WhatsApp com DDD.",
  });
});
