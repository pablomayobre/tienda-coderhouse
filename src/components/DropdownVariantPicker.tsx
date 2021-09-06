import { Select, Box, Heading } from "@chakra-ui/react";
import { Variants } from "../api/getItem";
import { useCallbackProp } from "../hooks/useCallbackProp";

type DropdownVariantPickerProps = {
  variant: Variants<"dropdown">;
  variantName: string;
  onChange?: (value: number) => void;
};

export const DropdownVariantPicker = ({
  variant,
  variantName,
  onChange,
}: DropdownVariantPickerProps) => {
  const onNumberChange = useCallbackProp(onChange);

  const onSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(Number(event.target.value))
    return onNumberChange(Number(event.target.value));
  };

  return (
    <Box>
      <Heading as="h4" size="sm" marginBottom={2}>
        {variant.displayName ?? variantName}:
      </Heading>
      <Select onChange={onSelected}>
        {Object.entries(variant.values).map(([name, value], index) => (
          <option value={index.toString()} selected={index === variant.default}>{value.displayName ?? name}</option>
        ))}
      </Select>
    </Box>
  );
};
