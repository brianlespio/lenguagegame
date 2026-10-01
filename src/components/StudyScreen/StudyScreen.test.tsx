import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StudyScreen } from "./StudyScreen";

const noop = vi.fn();

describe("StudyScreen", () => {
  it("shows the full translation when the 1s interval is selected", () => {
    render(
      <StudyScreen
        category="nouns"
        currentEntry={{ id: "n-house", category: "nouns", term: "house", translation: "casa" }}
        currentQuizItem={null}
        selectedChoiceKey={null}
        studyMode="study"
        isRevealed={false}
        isAutoPlaying
        interval={1000}
        randomMode={false}
        languagePair="en-es"
        cefrLevel="all"
        ttsMuted={false}
        ttsSupported={false}
        progress={{ current: 1, total: 10 }}
        isFullscreen={false}
        isIdle={false}
        isFallbackFullscreen={false}
        onScopeChange={noop}
        onLanguageChange={noop}
        onCefrChange={noop}
        onStudyModeChange={noop}
        onPrevious={noop}
        onNext={noop}
        onReveal={noop}
        onSelectChoice={noop}
        onToggleAutoPlay={noop}
        onIntervalChange={noop}
        onSpeak={noop}
        onToggleMute={noop}
        onToggleFullscreen={noop}
      />,
    );

    expect(screen.getByText("casa")).toHaveAttribute("data-revealed", "true");
    expect(screen.getByRole("button", { name: "Reveal translation" })).toBeDisabled();
  });

  it("hides category, level and accent orientation during a test", () => {
    render(
      <StudyScreen
        category="nouns"
        currentEntry={{ id: "n-house", category: "nouns", term: "house", translation: "casa" }}
        currentQuizItem={{
          promptId: "n-plight",
          direction: "forward",
          prompt: "plight",
          promptTranslation: "aprieto",
          promptKind: "word",
          category: "nouns",
          choices: [
            {
              key: "a",
              entryId: "n-plight",
              text: "aprieto",
              translation: "plight",
              correct: true,
              kind: "catalog",
            },
            {
              key: "b",
              entryId: "n-woe",
              text: "desdicha",
              translation: "woe",
              correct: false,
              kind: "catalog",
            },
          ],
        }}
        selectedChoiceKey={null}
        studyMode="test"
        isRevealed={false}
        isAutoPlaying={false}
        interval={5000}
        randomMode
        languagePair="en-es"
        cefrLevel="C2"
        ttsMuted={false}
        ttsSupported={false}
        progress={{ current: 4, total: 40 }}
        isFullscreen={false}
        isIdle={false}
        isFallbackFullscreen={false}
        onScopeChange={noop}
        onLanguageChange={noop}
        onCefrChange={noop}
        onStudyModeChange={noop}
        onPrevious={noop}
        onNext={noop}
        onReveal={noop}
        onSelectChoice={noop}
        onToggleAutoPlay={noop}
        onIntervalChange={noop}
        onSpeak={noop}
        onToggleMute={noop}
        onToggleFullscreen={noop}
      />,
    );

    expect(document.querySelector(".progress .text-progress-cat")).toBeNull();
    expect(document.querySelector(".accent-strip")).toBeNull();
    expect(document.querySelector(".text-hint")).toBeNull();
    expect(screen.queryByText("TEST")).not.toBeInTheDocument();
    expect(screen.getByText("4 / 40")).toBeInTheDocument();
    expect(screen.getAllByText("plight").length).toBeGreaterThan(0);
  });

  it("greys the word and moves on after a correct spelling", () => {
    const onNext = vi.fn();
    const onSpeak = vi.fn();
    render(
      <StudyScreen
        category="nouns"
        currentEntry={{ id: "n-house", category: "nouns", term: "house", translation: "casa" }}
        currentQuizItem={null}
        selectedChoiceKey={null}
        studyMode="study"
        isRevealed={false}
        isAutoPlaying={false}
        interval={5000}
        randomMode={false}
        languagePair="en-es"
        cefrLevel="all"
        ttsMuted
        ttsSupported={false}
        progress={{ current: 1, total: 10 }}
        isFullscreen={false}
        isIdle={false}
        isFallbackFullscreen={false}
        onScopeChange={noop}
        onLanguageChange={noop}
        onCefrChange={noop}
        onStudyModeChange={noop}
        onPrevious={noop}
        onNext={onNext}
        onReveal={noop}
        onSelectChoice={noop}
        onToggleAutoPlay={noop}
        onIntervalChange={noop}
        onSpeak={onSpeak}
        onToggleMute={noop}
        onToggleFullscreen={noop}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Practicar escritura" }));
    expect(document.querySelector(".text-english")).toHaveAttribute("data-spelling", "true");
    expect(onSpeak).toHaveBeenCalledTimes(1);
    for (const letter of "house") {
      fireEvent.click(screen.getByRole("button", { name: letter }));
    }
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
