import { describe, it, expect } from "vitest";
import { createLinkSchema } from "./schemas";

describe("createLinkSchema", () => {

   // URLs Valida
  it.each(["https://google.com", "https://youtube.com", "http://www.maikonfranco.com.br" ])
    ("Aceita %s", (value) => {
    const result = createLinkSchema.safeParse({ url: value});
    expect(result.success).toBe(true)
  });

  // URLs Invalidas
  it.each(["banana", "123", "!@#", "", {}, ])
  ("Rejeita %s", (value) => {
    const result = createLinkSchema.safeParse({ url: value });
    expect(result.success).toBe(false)
  });

  // URLs invalidas, não sao protoclos http ou https, possivel tentativa de ataque
   it.each(["ftp://arquivo.com", "javascript:alert(1)", "file:///etc/passwd", "data:text/html,<script>alert(1)</script>"])
   ("Rejeita %s", (value) => {
    const result = createLinkSchema.safeParse({ url: value });
    expect(result.success).toBe(false)
  });
 
});