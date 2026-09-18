import { describe, expect, it } from "vitest";
import { slugify } from "./slug";

describe("slugify", () => {
  it("strips accents and punctuation", () => {
    expect(slugify("à moins que")).toBe("a-moins-que");
    expect(slugify("d'abord")).toBe("d-abord");
  });

  it("maps French ligatures to ASCII", () => {
    expect(slugify("sœur")).toBe("soeur");
    expect(slugify("œuf")).toBe("oeuf");
  });
});
