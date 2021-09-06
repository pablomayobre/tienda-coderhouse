import useSWRImmutable from "swr/immutable";
import { useSWRConfig } from "swr";
import { useRef } from "react";

import { timeout } from "./helpers";
import { FullItem } from "./types";
import mock from "./mock";

export type {Variants, Value} from "./types"

export const getItem = async (
  id: string,
  abort?: AbortSignal
): Promise<FullItem> => {
  await timeout(2000, abort);

  let result = mock.find((item) => item.id === id)

  if (result) return result;

  throw new Error("Item not found")
};

export const useRefetchItem = (id: string) => {
  const { mutate } = useSWRConfig();

  return () => mutate(`api/item/${id}`);
};

export const useItem = (id: string) => {
  const aborter = useRef<AbortController>();

  const { data: item, mutate: refetch } = useSWRImmutable<FullItem>(
    [`api/item/${id}`, id],
    async (key, id) => {
      if (aborter.current) {
        aborter.current.abort();
      }

      aborter.current = new AbortController();
      return await getItem(id, aborter.current.signal);
    },
    {
      suspense: true,
    }
  );

  if (!item) throw new Error("Suspense mode should be enabled");

  return {
    item,
    refetch,
  };
};
