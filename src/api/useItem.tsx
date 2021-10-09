import {
  collection, query,
  where,
  limit
} from "firebase/firestore";
import {
  useFirestore,
  useFirestoreCollectionData
} from "reactfire";
import { FullItem } from "./types";

export const useItem = (id: string) => {
  const firestore = useFirestore();
  const itemsCollection = collection(firestore, "items");

  const { data } = useFirestoreCollectionData(
    query(itemsCollection, where("id", "==", id), limit(1)),
    {idField: "uid"}
  );

  return { item: (data?.[0] as FullItem | undefined) ?? null };
};
