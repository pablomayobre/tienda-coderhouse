import { Box, Heading, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useItems, useRefetchItems } from "../api/getItems";
import { Item, ItemSkeleton } from "./Item";

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Text fontSize="3xl">Hubo un error al cargar los items</Text>
      <Button onClick={resetErrorBoundary}>Reintentar</Button>
    </Flex>
  );
};

const SuspenseFallback = ({ size }: { size: number }) => {
  return (
    <>
      {new Array(size).fill(0).map((value, index) => {
        return <ItemSkeleton key={index} />;
      })}
    </>
  );
};

const List = ({category}: {category?: string}) => {
  const { items } = useItems(category);

  if (items.length === 0) return <>No items to show</>;

  return (
    <>
      {items.map((item, index) => {
        return <Item key={index} item={item} />;
      })}
    </>
  );
};

export const ItemList = ({title, category}: {title: string, category?: string}) => {
  const refetch = useRefetchItems(category);
  const columns = 4;

  return (
    <Box paddingBottom={4}>
      <Heading as="h2" textAlign="center">
        {title}
      </Heading>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={refetch}>
        <SimpleGrid
          columns={columns}
          spacing={4}
          minChildWidth={200}
          margin={6}
        >
          <Suspense fallback={<SuspenseFallback size={columns * 2} />}>
            <List category={category}/>
          </Suspense>
        </SimpleGrid>
      </ErrorBoundary>
    </Box>
  );
};
