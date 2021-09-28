import { doc } from "firebase/firestore";
import {
  useFirestore,
  useFirestoreDocData,
} from "reactfire";
import { FullOrder } from "./useSaveOrder";

export const useOrder = (id: string) => {
  const firestore = useFirestore();
  const item = doc(firestore, "orders", id);

  const data = useFirestoreDocData(item);

  return { order: (data.data as FullOrder | undefined) ?? null };
};
