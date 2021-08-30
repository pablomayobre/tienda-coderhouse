import useSWRImmutable from "swr/immutable";
import { useSWRConfig } from "swr";
import { useRef } from "react";

import { timeout } from "./helpers";
import { ItemData } from "./types";
import mock from "./mock";

export const getItems = async (
  category?: string,
  abort?: AbortSignal
): Promise<ItemData[]> => {
  await timeout(2000, abort);

  let result = mock;

  if (category && category !== "all") {
    result = mock.filter((value) => {
      if (category === "others") return (value.categories?.length ?? 0) === 0
      return value.categories?.find((c) => c === category) !== undefined;
    });
  }

  return result.filter(({ display }) => display !== false);
};

export const useRefetchItems = (category?: string) => {
  const { mutate } = useSWRConfig();

  return () => mutate("api/items");
};

export const useItems = (category?: string) => {
  const aborter = useRef<AbortController>();

  const { data: items, mutate: refetch } = useSWRImmutable<ItemData[]>(
    ["api/items", category],
    async (key, category) => {
      if (aborter.current) {
        aborter.current.abort();
      }

      aborter.current = new AbortController();
      return await getItems(category, aborter.current.signal);
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
