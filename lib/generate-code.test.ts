import { describe, it, expect } from "vitest";
import { generateCode } from "./generate-code";

describe("generateCode", () => {
  it("gera um código com o tamanho pedido", () => {
    expect(generateCode(6)).toHaveLength(6);
  });

  it("usa só letras e números", () => {
    expect(generateCode(10)).toMatch(/^[a-zA-Z0-9]+$/);
  });
});