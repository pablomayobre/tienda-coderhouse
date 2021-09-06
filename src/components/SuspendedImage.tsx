import {
  AspectRatio,
  Image as ChakraImage,
  Skeleton,
  AspectRatioProps,
} from "@chakra-ui/react";
import { Suspense } from "react";
import useSWRImmutable from "swr/immutable";

export const useSuspenseImage = (src: string) => {
  const { data } = useSWRImmutable(
    ["image", src],
    (key, src: string) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    },
    { suspense: true }
  );

  return data;
};

export type SuspendedImageProps = AspectRatioProps & {
  src: string;
  alt?: string;
};

const ImageView = ({
  src,
  alt = "",
  ...ratio
}: SuspendedImageProps) => {
  useSuspenseImage(src);

  return (
    <AspectRatio flexGrow={1} {...ratio}>
      <ChakraImage src={src} alt={alt} objectFit="cover" />
    </AspectRatio>
  );
};

export const ImageSkeleton = ({
  src,
  alt,
  ...ratio
}: Partial<SuspendedImageProps>) => {
  return (
    <Skeleton flexGrow={1}>
      <AspectRatio {...ratio}>
        <ChakraImage />
      </AspectRatio>
    </Skeleton>
  );
};

export const SuspendedImage = (props: SuspendedImageProps) => {
  return (
    <Suspense fallback={<ImageSkeleton {...props} />}>
      <ImageView {...props} />
    </Suspense>
  );
};
