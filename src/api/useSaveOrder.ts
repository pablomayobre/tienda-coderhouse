import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import { useCallback } from "react";
import { useFirestore, useUser } from "reactfire";
import { Buyer } from "../components/OrderDetailsModal";
import { CartData } from "../providers/CartProvider";
import { FullItem } from "./types";

export type FullOrder = {
  items: (CartData & { price: number | null })[];
  total: number;
  buyer: Buyer;
  date: string;
};

type ItemDocument = {
  snapshot: DocumentSnapshot<FullItem>;
  quantity: number;
};

export const useSaveOrder = () => {
  const firestore = useFirestore();
  const orders = collection(firestore, "orders");

  const { data: user } = useUser();

  return useCallback(
    async (items: CartData[], buyer: Buyer) => {
      const itemsIds = new Set(items.map(({ uniqueId }) => uniqueId));

      const documents: Map<string, ItemDocument | null> = new Map(
        await Promise.all(
          Array.from(itemsIds.values()).map(async (uniqueId) => {
            try {
              const snapshot = await getDoc(
                doc(firestore, "items", uniqueId) as DocumentReference<FullItem>
              );
              return [uniqueId, { snapshot, quantity: 0 }] as [
                string,
                ItemDocument
              ];
            } catch (e) {
              return [uniqueId, null] as [string, null];
            }
          })
        )
      );

      const itemsWithPrice = items.map((item) => {
        const document = documents.get(item.uniqueId);

        if (!document || !document.snapshot.exists())
          return { ...item, price: null };

        const { price, discount = 0 } = document.snapshot.data();

        document.quantity += item.quantity;

        return {
          ...item,
          price: price * (1 - discount),
        };
      });

      await Promise.all(
        Array.from(documents.values()).map(async (value) => {
          if (!value) return;

          const { snapshot, quantity } = value;

          if (!snapshot.exists()) return;

          try {
            const stock = Math.max(0, snapshot.data().stock - quantity);

            updateDoc(snapshot.ref, {
              stock,
              display: stock !== 0,
            });
          } catch (e) {
            console.error(e);
          }
        })
      );

      const order = await addDoc(orders, {
        items: itemsWithPrice,
        buyer,
        user: user?.uid ?? null,
        total: itemsWithPrice.reduce(
          (a, b) => a + (b.price ?? 0) * b.quantity,
          0 as number
        ),
        date: new Date().toISOString(),
      } as FullOrder);

      return order.id;
    },
    [orders, firestore, user]
  );
};
