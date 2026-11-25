import test from "node:test";
import assert from "node:assert/strict";
import { CATEGORIAS_PADRAO, categoriaValida } from "../src/lib/categorias.js";

test("categorias iniciais", () => {
  assert.deepEqual(CATEGORIAS_PADRAO, ["Reformas", "Computadores", "Celulares"]);
});

test("categoria da URL so aceita valores conhecidos", () => {
  assert.equal(categoriaValida("Celulares"), "Celulares");
  assert.equal(categoriaValida("Inexistente"), "");
  assert.equal(categoriaValida(null), "");
});
