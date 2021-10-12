import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { CATEGORY_ALL } from "../api/useCategories";
import {
  ItemListError,
  ItemListSuspense,
  ItemList,
} from "../components/ItemList";

const ItemListView = () => {
  const { category } = useParams();
  const columns = 4;

  return (
    <Box paddingBottom={4}>
      <ErrorBoundary FallbackComponent={ItemListError}>
        <Suspense fallback={<ItemListSuspense columns={columns} rows={2} />}>
          <ItemList category={category ?? CATEGORY_ALL} />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};

export default ItemListView;
