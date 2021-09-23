import { Box, Heading } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { formatCategory } from "../api/helpers";
import { ItemListError, ItemListSuspense, ItemList } from "../components/ItemList";

const ItemListView = () => {
  const {category} = useParams()
  const columns = 4;
  const title = formatCategory(category ?? "productos")

  return (
    <Box paddingBottom={4}>
      <Heading as="h2" textAlign="center">
        {title}
      </Heading>
      <ErrorBoundary FallbackComponent={ItemListError}>
        <Suspense fallback={<ItemListSuspense columns={columns} rows={2} />}>
          <ItemList category={category ?? "all"} />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};

export default ItemListView