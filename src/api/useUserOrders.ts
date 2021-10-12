import { collection, orderBy, query, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { FullOrder } from "./useSaveOrder";

export const useUserOrders = () => {
  const {data: user} = useUser();
  const firestore = useFirestore();

  const itemsCollection = collection(firestore, "orders");

  const { data } = useFirestoreCollectionData(
    query(itemsCollection, user ? where("user", "==", user.uid) : where("id", "==", null), orderBy("date", "desc")),
    {idField: "id"}
  );

  return data as (FullOrder & {id: string})[];
}