import {
  Flex,
  IconButton,
  Icon,
  Input,
  useNumberInput,
  UseNumberInputProps,
} from "@chakra-ui/react";
import { MdAdd, MdRemove } from "react-icons/md";

export const ItemCount = (props: UseNumberInputProps) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({ ...props, defaultValue: props.defaultValue ?? 0, allowMouseWheel: true });

  return (
    <Flex maxWidth={64}>
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
  );
};
