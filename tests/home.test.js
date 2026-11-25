import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync("src/app/page.js", "utf8");
const destaques = readFileSync("src/components/DestaquesHome.jsx", "utf8");
const header = readFileSync("src/components/Header.jsx", "utf8");

test("home e header expoem as secoes e o CTA de orcamento", () => {
  for (const texto of ["Como funciona", "Precisa de um orçamento?", "Solicitar orçamento", "Profissionais em destaque"]) {
    assert.equal(home.includes(texto) || destaques.includes(texto), true);
  }
  assert.match(home, /href="\/orcamento"/);
  assert.match(header, /href="\/orcamento"/);
});
