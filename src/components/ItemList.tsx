import {
  Button,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Box,
  useBreakpointValue,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";
import { useItems } from "../api/useItems";
import { Item, ItemSkeleton } from "./Item";
import { Categories } from "./Categories";
import { CATEGORY_ALL, useCategories } from "../api/useCategories";

export const ItemListError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Text fontSize="3xl">Hubo un error al cargar los items</Text>
      <Button onClick={resetErrorBoundary}>Reintentar</Button>
    </Flex>
  );
};

export const ItemListSuspense = ({
  columns = 4,
  rows = 2,
}: {
  columns?: number;
  rows?: number;
}) => {
  return (
    <SimpleGrid columns={columns} spacing={4} minChildWidth={200} margin={6}>
      {new Array(columns * rows).fill(0).map((value, index) => {
        return <ItemSkeleton key={index} />;
      })}
    </SimpleGrid>
  );
};

export const ItemList = ({
  category = CATEGORY_ALL,
  columns = 4,
}: {
  category?: string;
  columns?: number;
}) => {
  const { items } = useItems(category);
  const title = useCategories().get(category) ?? category

  const display = useBreakpointValue({ base: false, md: true }) ?? true;

  if (items.length === 0) return <>No items to show</>;

  return (
    <Flex margin={4} marginTop={0} gridGap={4}>
      {display ? (
        <Box
          position="relative"
          maxWidth={56}
          width="100%"
          bg="white"
          borderRadius={4}
          paddingTop={4}
          shadow="xs"
        >
          <Stack
            position="sticky"
            top="calc(var(--chakra-sizes-header) + var(--chakra-sizes-4))"
          >
            <Heading marginLeft={8} fontSize="md">
              Categorías:
            </Heading>
            <Divider marginBottom={2} />
            <Categories
              useAlternativeNaming
              borderRadius={0}
              justifyContent="left"
              paddingLeft={10}
            />
          </Stack>
        </Box>
      ) : null}
      <Box alignSelf="flex-start" flexGrow={2}>
        <Heading as="h2" textAlign="center">
          {title}
        </Heading>
        <SimpleGrid columns={columns} spacing={4} marginTop={4} minChildWidth={200}>
          {items.map((item, index) => {
            return <Item key={index} item={item} />;
          })}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};
