import { useState } from "react";
import type { CategoryFilter, CefrFilter, LanguagePairId, StudyMode, StudyScope } from "../../types/vocabulary";
import { CategorySelector } from "../CategorySelector/CategorySelector";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { LevelSelector } from "../LevelSelector/LevelSelector";
import { ModeSelector } from "../ModeSelector/ModeSelector";

interface StudyMenusProps {
  category: CategoryFilter;
  randomMode: boolean;
  languagePair: LanguagePairId;
  cefrLevel: CefrFilter;
  studyMode: StudyMode;
  onScopeChange: (scope: StudyScope) => void;
  onLanguageChange: (pair: LanguagePairId) => void;
  onCefrChange: (level: CefrFilter) => void;
  onStudyModeChange: (mode: StudyMode) => void;
  reviewing?: boolean;
  onToggleReview?: () => void;
}

export function StudyMenus({
  category,
  randomMode,
  languagePair,
  cefrLevel,
  studyMode,
  onScopeChange,
  onLanguageChange,
  onCefrChange,
  onStudyModeChange,
  reviewing = false,
  onToggleReview,
}: StudyMenusProps) {
  const [openMenu, setOpenMenu] = useState<"category" | "language" | "level" | "mode" | null>(null);

  return (
    <div className="study-menus">
      <CategorySelector
        category={category}
        randomMode={randomMode}
        open={openMenu === "category"}
        onOpenChange={(open) => setOpenMenu(open ? "category" : null)}
        onChange={onScopeChange}
      />
      <LevelSelector
        value={cefrLevel}
        open={openMenu === "level"}
        onOpenChange={(open) => setOpenMenu(open ? "level" : null)}
        onChange={onCefrChange}
      />
      <LanguageSelector
        value={languagePair}
        open={openMenu === "language"}
        onOpenChange={(open) => setOpenMenu(open ? "language" : null)}
        onChange={onLanguageChange}
      />
      <ModeSelector
        value={studyMode}
        open={openMenu === "mode"}
        onOpenChange={(open) => setOpenMenu(open ? "mode" : null)}
        onChange={onStudyModeChange}
      />
      {onToggleReview ? (
        <button type="button" className="fold-trigger" aria-pressed={reviewing} onClick={onToggleReview}>
          Repasar fallos
        </button>
      ) : null}
    </div>
  );
}
