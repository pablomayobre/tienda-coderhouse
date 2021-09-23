import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { ItemDetailSuspense, ItemDetail, ItemDetailError } from "../components/ItemDetail";

const ItemDetailView = () => {
  const {id} = useParams()

  return (
    <ErrorBoundary FallbackComponent={ItemDetailError}>
      <Suspense fallback={<ItemDetailSuspense />}>
        <ItemDetail id={id ?? ""} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ItemDetailView
