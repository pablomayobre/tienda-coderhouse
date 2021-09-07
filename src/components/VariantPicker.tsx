import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useCallbackProp } from "../hooks/useCallbackProp";
import { ColorVariantPicker } from "./ColorVariantPicker";
import { DropdownVariantPicker } from "./DropdownVariantPicker";
import type { FullItem, GenericVariant } from "../api/types";

export type GenericVariantProps = {
  variantName: string;
  onChange?: (name: string, value: string) => void;
  selected: string;
}

export type VariantPickerProps = {
  variants?: Record<string, GenericVariant>;
  selected: Record<string, string>;
  setSelected: Dispatch<SetStateAction<Record<string, string>>>;
};

export const VariantPicker = ({
  variants: recordVariants, selected, setSelected,
}: VariantPickerProps) => {
  const variants = useMemo(
    () => Object.entries(recordVariants ?? {}),
    [recordVariants]
  );

  const setter = useCallbackProp(setSelected);

  const onChange = useCallback(
    (name: string, value: string) => {
      setter((selected) => {
        return { ...selected, [name]: value };
      });
    },
    [setter]
  );

  return (
    <>
      {variants.map(([name, variant], index) => {
        return variant.type === "color" ? (
          <ColorVariantPicker
            key={index}
            variant={variant}
            variantName={name}
            onChange={onChange}
            selected={selected[name] ?? variant.default} />
        ) : (
          <DropdownVariantPicker
            key={index}
            variant={variant}
            variantName={name}
            onChange={onChange}
            selected={selected[name] ?? variant.default} />
        );
      })}
    </>
  );
};

export const getDefaultVariants = (item: FullItem): Record<string, string> => {
  return Object.fromEntries(Object.entries(item.variants ?? {}).map(([name, variant]) => [name, variant.default]));
};


