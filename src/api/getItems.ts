import useSWRImmutable from "swr/immutable";
import { useSWRConfig } from "swr";
import { useRef, useCallback } from "react";

import { timeout } from "./helpers";
import { ItemData } from "./types";

export const getItems = async (abort?: AbortSignal): Promise<ItemData[]> => {
  await timeout(2000, abort);

  return [
    {
      id: "gameboy-color",
      title: "Game Boy Color",
      description:
        "La Game Boy Color es una consola de videojuegos portatil lanzada en el año 1998, hoy considerada una reliquia",
      price: 10,
      pictureURL:
        "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "cupcake",
      title: "Cupcake",
      description: "Un perfecto cupcake color amarillo",
      price: 10,
      pictureURL:
        "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "zapatillas-vans",
      title: "Zapatillas Vans",
      description:
        "Unas zapatillas marca Vans On the Wall, hechas de tela y gamuza negra.",
      price: 10,
      pictureURL:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=343&q=80",
    },
    {
      id: "modelo-fiat600",
      title: "Modelo Fiat 600",
      description: "Un modelo a escala de colección de un Fiat 600.",
      price: 10,
      pictureURL:
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "mando-xboxone",
      title: "Mando de XBox One",
      description: "Un mando de XBox One en su color blanco original.",
      price: 10,
      pictureURL:
        "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1534&q=80",
    },
    {
      id: "modelo-ferrari",
      title: "Modelo de Ferrari",
      description: "Un modelo a escala de colección de un auto Ferrari.",
      price: 10,
      pictureURL:
        "https://images.unsplash.com/photo-1572635196184-84e35138cf62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "airpods",
      title: "Apple Airpods",
      description: "Los Apple Airpods son auriculares inalambricos.",
      price: 10,
      pictureURL:
        "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80",
    },
    {
      id: "amazon-echo",
      title: "Amazon Echo",
      description:
        "Amazon Echo acerca a Alexa, tu asistente personal, a donde quiera que la necesites.",
      price: 10,
      pictureURL:
        "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1567&q=80",
    },
  ];
};

export const useRefetchItems = () => {
  const { mutate } = useSWRConfig();

  return useCallback(() => mutate("api/items"), [mutate]);
};

export const useItems = () => {
  const aborter = useRef<AbortController>();

  const { data: items, mutate: refetch } = useSWRImmutable<ItemData[]>(
    "api/items",
    async () => {
      if (aborter.current) {
        aborter.current.abort();
      }

      aborter.current = new AbortController();
      return await getItems(aborter.current.signal);
    },
    {
      suspense: true,
    }
  );

  if (!items) throw new Error("Suspense mode should be enabled");

  return {
    items,
    refetch,
  };
};
