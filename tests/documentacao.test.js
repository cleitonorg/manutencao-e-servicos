import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const readme = readFileSync("README.md", "utf8");

test("README descreve setup real e caminhos corretos", () => {
  assert.equal(readme.includes("src/styles/"), false);
  assert.match(readme, /supabase\/schema\.sql/);
  assert.match(readme, /npm test/);
  assert.match(readme, /npm run build/);
});
