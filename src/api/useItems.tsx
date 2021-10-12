import { collection, query, where } from "firebase/firestore";
import { useMemo } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { FullItem } from "./types";
import { CATEGORY_ALL, CATEGORY_OTHERS } from "./useCategories";

export const useItems = (category?: string) => {
  const firestore = useFirestore();

  const condition = useMemo(() => {
    switch (category) {
      case CATEGORY_ALL:
      case undefined:
        return [];
      case CATEGORY_OTHERS:
        return [where("categories", "==", [])];
      default:
        return [where("categories", "array-contains", category)];
    }
  }, [category]);

  const itemsCollection = useMemo(() => {
    return query(
      collection(firestore, "items"),
      where("display", "!=", false),
      ...condition
    );
  }, [condition, firestore]);

  const { data = []} = useFirestoreCollectionData(itemsCollection, {
    idField: "uid",
  });

  return {
    items: data as FullItem[],
  };
};
