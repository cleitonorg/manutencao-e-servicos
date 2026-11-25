import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const servico = readFileSync("src/services/orcamentos.service.js", "utf8");
const orcamento = readFileSync("src/components/FormOrcamento.jsx", "utf8");
const cadastro = readFileSync("src/app/cadastro-profissional/page.js", "utf8");

test("services de escrita nao pedem SELECT ao banco", () => {
  assert.equal(/\.select\(/.test(servico), false);
  assert.match(servico, /enviarPedidoOrcamento/);
  assert.match(servico, /enviarSolicitacaoCadastro/);
});

test("formularios usam services e nao simulam envio", () => {
  assert.match(orcamento, /enviarPedidoOrcamento/);
  assert.match(cadastro, /enviarSolicitacaoCadastro/);
  for (const fonte of [orcamento, cadastro]) {
    assert.equal(/setTimeout\(/.test(fonte), false);
    assert.equal(/console\.log\(/.test(fonte), false);
  }
});
