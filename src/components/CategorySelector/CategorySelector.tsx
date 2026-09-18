import { STUDY_SCOPE_OPTIONS } from "../../constants";
import type { CategoryFilter, StudyScope } from "../../types/vocabulary";
import { toStudyScope } from "../../utils/vocabulary";
import { CollapsibleSelect } from "../CollapsibleSelect/CollapsibleSelect";

interface CategorySelectorProps {
  category: CategoryFilter;
  randomMode: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (scope: StudyScope) => void;
}

export function CategorySelector({
  category,
  randomMode,
  open,
  onOpenChange,
  onChange,
}: CategorySelectorProps) {
  return (
    <CollapsibleSelect
      label="Categoría"
      value={toStudyScope(category, randomMode)}
      options={STUDY_SCOPE_OPTIONS}
      open={open}
      onOpenChange={onOpenChange}
      onChange={onChange}
    />
  );
}
