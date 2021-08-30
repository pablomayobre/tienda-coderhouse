import useSWRImmutable from "swr/immutable";

export const useSuspenseImage = (src: string) => {
  const { data } = useSWRImmutable(["image", src], (key, src: string) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  }, {suspense: true});

  return data;
};
