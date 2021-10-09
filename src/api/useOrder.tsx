import { doc } from "firebase/firestore";
import {
  useFirestore,
  useFirestoreDocData,
} from "reactfire";
import { FullOrder } from "./useSaveOrder";

export const useOrder = (id: string) => {
  const firestore = useFirestore();
  const item = doc(firestore, "orders", id);

  const {data: order} = useFirestoreDocData(item);

  return { order: order ?? null } as {order: FullOrder|null};
};
