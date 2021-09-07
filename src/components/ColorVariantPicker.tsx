import {
  Box,
  Heading,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useCallbackProp } from "../hooks/useCallbackProp";
import type { Variants, Value } from "../api/types";
import type {GenericVariantProps} from "./VariantPicker"

type ColorVariantProps = UseRadioProps & {
  variant: Value<"color">;
};

const ColorVariant = ({ variant, ...props }: ColorVariantProps) => {
  const { getInputProps, getCheckboxProps } = useRadio({ ...props });

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const checked = (checkbox as any)["data-checked"] !== undefined;

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

export type ColorVariantPickerProps = GenericVariantProps & {
  variant: Variants<"color">;
};

export const ColorVariantPicker = ({
  variant,
  variantName,
  onChange,
  selected,
}: ColorVariantPickerProps) => {
  const onVariantChange = useCallbackProp(onChange);
  const onSelected = useCallback(
    (value: string) => onVariantChange(variantName, value),
    [onVariantChange, variantName]
  );

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: variantName,
    value: selected,
    onChange: onSelected,
  });

  return (
    <Box overflowX="auto" overflowY="hidden" {...getRootProps()}>
      <Heading as="h4" size="sm" marginBottom={2}>
        {variant.displayName ?? variantName}:
      </Heading>
      {Object.entries(variant.values).map(([value, variant], index) => (
        <ColorVariant
          key={index}
          {...getRadioProps({ value })}
          variant={variant}
        />
      ))}
    </Box>
  );
};
