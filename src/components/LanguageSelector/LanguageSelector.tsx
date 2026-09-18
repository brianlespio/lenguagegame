import { LANGUAGE_PAIRS } from "../../constants";
import type { LanguagePairId } from "../../types/vocabulary";
import { CollapsibleSelect } from "../CollapsibleSelect/CollapsibleSelect";

interface LanguageSelectorProps {
  value: LanguagePairId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (pair: LanguagePairId) => void;
}

export function LanguageSelector({ value, open, onOpenChange, onChange }: LanguageSelectorProps) {
  return (
    <CollapsibleSelect
      label="Idioma"
      value={value}
      options={LANGUAGE_PAIRS.map((pair) => ({
        value: pair.id,
        label: pair.label,
        hint: pair.available ? undefined : "Próximamente",
        disabled: !pair.available,
      }))}
      open={open}
      onOpenChange={onOpenChange}
      onChange={onChange}
    />
  );
}
