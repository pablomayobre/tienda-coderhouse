import { addDoc, collection, doc, getDoc } from "@firebase/firestore";
import { useCallback } from "react";
import { useFirestore, useUser } from "reactfire";
import { Buyer } from "../components/OrderDetailsModal";
import { CartData } from "../providers/CartProvider";

export type FullOrder = {
  items: (CartData & {price: number|null})[],
  total: number,
  buyer: Buyer,
  date: string
}

export const useSaveOrder = () => {
  const firestore = useFirestore();
  const orders = collection(firestore, "orders")

  const {data: user} = useUser();

  return useCallback(async (items: CartData[], buyer: Buyer) => {
    const itemsIds = new Set(items.map(({uniqueId}) => uniqueId))

    const prices: Record<string, number|null> = Object.fromEntries(await Promise.all(Array.from(itemsIds.values()).map(async (id) => {
      try {
        const document = await getDoc(doc(firestore, "items", id))
        const item = document.data();
        return [id, (item?.price ? item.price * (1 - (item.discount ?? 0)): null)] as const
      } catch (e){
        return [id, null] as const
      }
    })))

    const itemsWithPrice = items.map((item) => ({...item, price: prices[item.uniqueId]}))

    const order = await addDoc(orders, {
      items: itemsWithPrice,
      buyer,
      user: user?.uid ?? null,
      total: itemsWithPrice.reduce((a, b) => (a + (b.price ?? 0) * b.quantity), 0 as number),
      date: new Date().toISOString()
    } as FullOrder)

    return order.id
  }, [orders, firestore, user])
}