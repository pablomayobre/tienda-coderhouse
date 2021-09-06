import { Box, Heading } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRefetchItems } from "../api/getItems";
import { ItemListError, ItemListSuspense, ItemList } from "./ItemList";


export const ItemListContainer = ({
  title, category,
}: {
  title: string;
  category?: string;
}) => {
  const refetch = useRefetchItems(category);
  const columns = 4;

  return (
    <Box paddingBottom={4}>
      <Heading as="h2" textAlign="center">
        {title}
      </Heading>
      <ErrorBoundary FallbackComponent={ItemListError} onReset={refetch}>
        <Suspense fallback={<ItemListSuspense columns={columns} rows={2} />}>
          <ItemList category={category} />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};
