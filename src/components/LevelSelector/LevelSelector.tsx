import { CEFR_FILTER_OPTIONS } from "../../constants";
import type { CefrFilter } from "../../types/vocabulary";
import { CollapsibleSelect } from "../CollapsibleSelect/CollapsibleSelect";

interface LevelSelectorProps {
  value: CefrFilter;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (level: CefrFilter) => void;
}

export function LevelSelector({ value, open, onOpenChange, onChange }: LevelSelectorProps) {
  return (
    <div className="fold-select-level">
      <CollapsibleSelect
        label="Nivel"
        value={value}
        options={CEFR_FILTER_OPTIONS}
        open={open}
        onOpenChange={onOpenChange}
        onChange={onChange}
      />
    </div>
  );
}
