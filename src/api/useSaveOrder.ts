import { addDoc, collection, doc, getDoc } from "@firebase/firestore";
import { useCallback } from "react";
import { useFirestore } from "reactfire";
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

  return useCallback(async (items: CartData[], buyer: Buyer) => {
    const itemsIds = new Set(items.map(({itemId}) => itemId))

    const prices: Record<string, number|undefined> = Object.fromEntries(await Promise.all(Array.from(itemsIds.values()).map(async (id) => {
      try {
      const item = await getDoc(doc(firestore, "items", id))
      return [id, item.data()?.price ?? null as number|null] as const
      } catch (e){
        return [id, null] as const
      }
    })))

    const itemsWithPrice = items.map((item) => ({...item, price: prices[item.itemId]}))

    const order = await addDoc(orders, {
      items: itemsWithPrice,
      buyer,
      total: itemsWithPrice.reduce((a, b) => (a + (b.price ?? 0)), 0 as number),
      date: new Date().toISOString()
    } as FullOrder)

    return order.id
  }, [orders, firestore])
}