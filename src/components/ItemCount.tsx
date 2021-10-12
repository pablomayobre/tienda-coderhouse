import {
  Flex,
  IconButton,
  Icon,
  Input,
  useNumberInput,
  UseNumberInputProps,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { MdAdd, MdRemove } from "react-icons/md";

export const ItemCount = ({label, ...props}: UseNumberInputProps & {label?: string}) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      ...props,
      defaultValue: props.defaultValue ?? 0,
      allowMouseWheel: true,
    });

  return (
    <FormControl>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Flex>
        <IconButton
          {...getDecrementButtonProps()}
          icon={<Icon as={MdRemove} size={5} />}
          aria-label="Incrementar"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          colorScheme="purple"
          variant="outline"
        />
        <Input
          {...getInputProps()}
          label="Cantidad"
          borderRadius={0}
          colorScheme="purple"
          borderColor="purple.500"
          borderLeft={0}
          borderRight={0}
          textAlign="center"
        />
        <IconButton
          {...getIncrementButtonProps()}
          icon={<Icon as={MdAdd} size={5} />}
          aria-label="Decrementar"
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          colorScheme="purple"
          variant="outline"
        />
      </Flex>
    </FormControl>
  );
};
