import { collection, query } from "firebase/firestore";
import { useMemo } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

export const useCategories = (useAlternativeNaming?: boolean) => {
  const firestore = useFirestore();

  const categoriesCollection = collection(firestore, "categories");

  const { data: categories } = useFirestoreCollectionData(
    query(categoriesCollection)
  );

  return useMemo(
    () =>
      new Map(categories.map(({ id, name }) => [id as string, name as string]))
        .set("otros", "Otros")
        .set("todos", useAlternativeNaming ? "Todos" : "Productos"),
    [categories, useAlternativeNaming]
  );
};

export const sortCategories = (categories: Map<string, string>) => {
  return Array.from(categories.entries())
    .filter(([id]) => id !== CATEGORY_ALL && id !== CATEGORY_OTHERS)
    .map(([id, name]) => ({id, name}))
    .sort();
};

export const CATEGORY_ALL = "todos";
export const CATEGORY_OTHERS = "otros";
