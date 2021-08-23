import {
  Flex,
  IconButton,
  Icon,
  Input,
  // useNumberInput,
  // UseNumberInputProps,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import { useCallbackProp } from "../hooks/useCallbackProp";

type ItemCountProps = {
  initialValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  min?: number;
  step?: number;
};

export const ItemCount = ({
  onChange,
  initialValue,
  max = Infinity,
  min = -Infinity,
  step = 1,
}: ItemCountProps) => {
  const [count, setCount] = useState(initialValue ?? 0);

  const handler = useCallbackProp(onChange);

  const increment = useCallback(
    () => setCount((start) => Math.min(start + step, max)),
    [setCount, max, step]
  );
  const decrement = useCallback(
    () => setCount((start) => Math.max(start - step, min)),
    [setCount, min, step]
  );

  useEffect(() => {
    handler(count);
  }, [handler, count]);

  return (
    <Flex maxWidth={64}>
      <IconButton
        icon={<Icon as={MdAdd} size={5} />}
        onClick={increment}
        aria-label="Incrementar"
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        colorScheme="purple"
        variant="outline"
      />
      <Input
        borderRadius={0}
        type="number"
        value={count}
        onChange={(e) =>
          setCount(Math.min(Math.max(Number(e.target.value), min), max))
        }
        colorScheme="purple"
        borderColor="purple.500"
        borderLeft={0}
        borderRight={0}
        textAlign="center"
      />
      <IconButton
        icon={<Icon as={MdRemove} size={5} />}
        onClick={decrement}
        aria-label="Decrementar"
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        colorScheme="purple"
        variant="outline"
      />
    </Flex>
  );
};

// export const BetterItemCount = (props: UseNumberInputProps) => {
//   const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
//     useNumberInput({ ...props, allowMouseWheel: true });

//   return (
//     <Flex maxWidth={64}>
//       <IconButton
//         {...getIncrementButtonProps()}
//         icon={<Icon as={MdAdd} size={5} />}
//         aria-label="Incrementar"
//         borderTopRightRadius={0}
//         borderBottomRightRadius={0}
//         colorScheme="purple"
//         variant="outline"
//       />
//       <Input
//         {...getInputProps()}
//         borderRadius={0}
//         colorScheme="purple"
//         borderColor="purple.500"
//         borderLeft={0}
//         borderRight={0}
//         textAlign="center"
//       />
//       <IconButton
//         {...getDecrementButtonProps()}
//         icon={<Icon as={MdRemove} size={5} />}
//         aria-label="Decrementar"
//         borderTopLeftRadius={0}
//         borderBottomLeftRadius={0}
//         colorScheme="purple"
//         variant="outline"
//       />
//     </Flex>
//   );
// };
