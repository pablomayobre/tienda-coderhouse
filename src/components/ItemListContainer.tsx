import { Box, Heading } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { useRefetchItems } from "../api/getItems";
import { formatCategory } from "../api/helpers";
import { ItemListError, ItemListSuspense, ItemList } from "./ItemList";

export const ItemListContainer = () => {
  const {category} = useParams()
  const refetch = useRefetchItems(category ?? "all");
  const columns = 4;
  const title = formatCategory(category ?? "productos")

  return (
    <Box paddingBottom={4}>
      <Heading as="h2" textAlign="center">
        {title}
      </Heading>
      <ErrorBoundary FallbackComponent={ItemListError} onReset={refetch}>
        <Suspense fallback={<ItemListSuspense columns={columns} rows={2} />}>
          <ItemList category={category ?? "all"} />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};
