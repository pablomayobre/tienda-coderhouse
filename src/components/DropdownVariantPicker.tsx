import { Select, Box, Heading } from "@chakra-ui/react";
import { useCallback } from "react";
import { useCallbackProp } from "../hooks/useCallbackProp";
import type { Variants } from "../api/types";
import type { GenericVariantProps } from "./VariantPicker";

type DropdownVariantPickerProps = GenericVariantProps & {
  variant: Variants<"dropdown">;
};

export const DropdownVariantPicker = ({
  variant,
  variantName,
  onChange,
  selected
}: DropdownVariantPickerProps) => {
  const onVariantChange = useCallbackProp(onChange);
  const onSelected = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      onVariantChange(variantName, event.target.value),
    [onVariantChange, variantName]
  );

  return (
    <Box>
      <Heading as="h4" size="sm" marginBottom={2}>
        {variant.displayName ?? variantName}:
      </Heading>
      <Select onChange={onSelected} value={selected}>
        {Object.entries(variant.values).map(([name, value], index) => (
          <option value={name} key={index}>
            {value.displayName ?? name}
          </option>
        ))}
      </Select>
    </Box>
  );
};
