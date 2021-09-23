import {
  collection, query,
  where, QueryConstraint
} from "firebase/firestore";
import {
  useFirestore,
  useFirestoreCollectionData
} from "reactfire";
import { FullItem } from "./types";


export const useItems = (
  category?: string,
  otherConstraints?: QueryConstraint[]
) => {
  const firestore = useFirestore();

  let condition: QueryConstraint;

  switch (category) {
    case "all":
    case undefined:
      condition = where("id", "!=", null);
      break;
    case "other":
      condition = where("categories", "==", []);
      break;
    default:
      console.log(category);
      condition = where("categories", "array-contains", category);
      break;
  }

  const itemsCollection = collection(firestore, "items");

  const { data } = useFirestoreCollectionData(
    query(itemsCollection, condition, ...(otherConstraints ?? []))
  );

  console.log(data);

  return { items: (data ?? []) as FullItem[] };
};
