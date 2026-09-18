import { STUDY_MODE_OPTIONS } from "../../constants";
import type { StudyMode } from "../../types/vocabulary";
import { CollapsibleSelect } from "../CollapsibleSelect/CollapsibleSelect";

interface ModeSelectorProps {
  value: StudyMode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (mode: StudyMode) => void;
}

export function ModeSelector({ value, open, onOpenChange, onChange }: ModeSelectorProps) {
  return (
    <div className="fold-select-level">
      <CollapsibleSelect
        label="Modo"
        value={value}
        options={STUDY_MODE_OPTIONS}
        open={open}
        onOpenChange={onOpenChange}
        onChange={onChange}
      />
    </div>
  );
}
