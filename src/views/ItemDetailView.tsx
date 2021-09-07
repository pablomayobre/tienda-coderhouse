import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { useRefetchItem } from "../api/getItem";
import { ItemDetailSuspense, ItemDetail, ItemDetailError } from "../components/ItemDetail";

const ItemDetailView = () => {
  const {id} = useParams()
  const refetch = useRefetchItem(id ?? "");

  return (
    <ErrorBoundary FallbackComponent={ItemDetailError} onReset={refetch}>
      <Suspense fallback={<ItemDetailSuspense />}>
        <ItemDetail id={id ?? ""} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ItemDetailView
