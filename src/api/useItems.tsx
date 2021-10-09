import { collection, query, where, QueryConstraint } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { FullItem } from "./types";

export const useItems = (
  category?: string,
  otherConstraints?: QueryConstraint[]
) => {
  const firestore = useFirestore();

  let condition: QueryConstraint[];

  switch (category) {
    case "all":
    case undefined:
      condition = [];
      break;
    case "other":
      condition = [where("categories", "==", [])];
      break;
    default:
      condition = [where("categories", "array-contains", category)];
      break;
  }

  const itemsCollection = collection(firestore, "items");

  const { data } = useFirestoreCollectionData(
    query(
      itemsCollection,
      where("display", "!=", false),
      ...condition,
      ...(otherConstraints ?? [])
    ),
    { idField: "uid" }
  );

  return {
    items: (data ?? []) as FullItem[],
  };
};
