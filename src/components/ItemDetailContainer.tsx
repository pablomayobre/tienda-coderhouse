import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRefetchItem } from "../api/getItem";
import { ItemDetailSuspense, ItemDetail, ItemDetailError } from "./ItemDetail";

export const ItemDetailContainer = ({ id }: { id: string }) => {
  const refetch = useRefetchItem(id);

  return (
    <ErrorBoundary FallbackComponent={ItemDetailError} onReset={refetch}>
      <Suspense fallback={<ItemDetailSuspense />}>
        <ItemDetail id={id} />
      </Suspense>
    </ErrorBoundary>
  );
};
