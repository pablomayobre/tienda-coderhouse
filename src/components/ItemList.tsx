import { Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";
import { useItems } from "../api/getItems";
import { Item, ItemSkeleton } from "./Item";

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
  category,
  columns = 4,
}: {
  category?: string;
  columns?: number;
}) => {
  const { items } = useItems(category);

  if (items.length === 0) return <>No items to show</>;

  return (
    <SimpleGrid columns={columns} spacing={4} minChildWidth={200} margin={6}>
      {items.map((item, index) => {
        return <Item key={index} item={item} />;
      })}
    </SimpleGrid>
  );
};


