import {
  Box, Heading, useRadio,
  useRadioGroup,
  UseRadioProps
} from "@chakra-ui/react";
import { useCallback } from "react";
import { Variants, Value } from "../api/getItem";
import { useCallbackProp } from "../hooks/useCallbackProp";

type ColorVariantProps = UseRadioProps & {
  variant: Value<"color">;
};
const ColorVariant = ({ variant, ...props }: ColorVariantProps) => {
  const { getInputProps, getCheckboxProps } = useRadio({ ...props });

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const checked = (checkbox as unknown as { "data-checked": "" | undefined; })["data-checked"] !== undefined;

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        borderRadius="100%"
        width={12}
        height={12}
        borderColor="gray.400"
        transform="scale(0.8)"
        _checked={{
          borderColor: "purple.400",
          transform: "scale(1)",
        }}
        _focus={{
          borderColor: "purple.400",
        }}
        borderWidth={2}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        title={variant.displayName ?? props.name}
      >
        <Box
          borderRadius="100%"
          backgroundColor={variant.color}
          width="80%"
          height="80%"
          transform={checked ? "scale(1)" : "scale(1.5)"}
          borderColor="gray.400"
          borderWidth={1}
        ></Box>
      </Box>
    </Box>
  );
};
type ColorVariantPickerProps = {
  variant: Variants<"color">;
  variantName: string;
  onChange?: (value: number) => void;
};
export const ColorVariantPicker = ({
  variant, variantName, onChange,
}: ColorVariantPickerProps) => {
  const onNumberChange = useCallbackProp(onChange);
  const onStringChange = useCallback(
    (value: string) => onNumberChange(Number(value)),
    [onNumberChange]
  );

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: variant.default.toString(),
    onChange: onStringChange,
  });

  return (
    <Box overflowX="auto" overflowY="hidden" {...getRootProps()}>
      <Heading as="h4" size="sm" marginBottom={2}>
        {variant.displayName ?? variantName}:
      </Heading>
      {Object.entries(variant.values).map(([name, variant], value) => (
        <ColorVariant
          key={value}
          {...getRadioProps({ value: value.toString() })}
          variant={variant} />
      ))}
    </Box>
  );
};
