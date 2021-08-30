import useSWRImmutable from "swr/immutable";
import { useSWRConfig } from "swr";
import { useRef, useCallback } from "react";

import { timeout } from "./helpers";
import { ItemData } from "./types";
import mock from "./mock";

export const getItems = async (
  category?: string,
  abort?: AbortSignal
): Promise<ItemData[]> => {
  await timeout(2000, abort);

  let result = mock

  if (category) {
    result = mock.filter((value) => {
      return value.categories.find((c) => c === category) !== undefined
    })
  }
  return result;
};

export const useRefetchItems = () => {
  const { mutate } = useSWRConfig();

  return useCallback(() => mutate("api/items"), [mutate]);
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
