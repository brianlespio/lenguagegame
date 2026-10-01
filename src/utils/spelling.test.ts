import { describe, expect, it } from "vitest";
import { applySpellingLetter, foldSpelling, spellingTarget } from "./spelling";

describe("spelling", () => {
  it("uses the shown word, not a phrase", () => {
    expect(
      spellingTarget({ id: "n-house", category: "nouns", term: "house", translation: "casa" }),
    ).toBe("house");
    expect(
      spellingTarget({
        id: "v-go",
        category: "verbs",
        infinitive: "go",
        past: "went",
        pastParticiple: "gone",
        infinitiveTranslation: "ir",
        pastTranslation: "fue",
        pastParticipleTranslation: "ido",
      }),
    ).toBe("go");
    expect(
      spellingTarget({
        id: "q-1",
        category: "questions",
        term: "Do you like coffee?",
        translation: "¿Te gusta el café?",
      }),
    ).toBeNull();
  });

  it("accepts case-insensitive letters and restarts on a miss", () => {
    expect(applySpellingLetter("House", "", "h")).toBe("advance");
    expect(applySpellingLetter("House", "H", "o")).toBe("advance");
    expect(applySpellingLetter("House", "Ho", "u")).toBe("advance");
    expect(applySpellingLetter("House", "Hou", "s")).toBe("advance");
    expect(applySpellingLetter("House", "Hous", "E")).toBe("complete");
    expect(applySpellingLetter("House", "Ho", "x")).toBe("restart");
    expect(applySpellingLetter("café", "caf", "é")).toBe("complete");
    expect(applySpellingLetter("café", "caf", "e")).toBe("restart");
    expect(foldSpelling("Été")).toBe(foldSpelling("été"));
  });
});
