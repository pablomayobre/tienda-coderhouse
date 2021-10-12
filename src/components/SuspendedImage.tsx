import {
  AspectRatio,
  Image as ChakraImage,
  Skeleton,
  Box,
  AspectRatioProps,
  ChakraComponent,
} from "@chakra-ui/react";
import { ComponentProps, Suspense } from "react";
import useSWRImmutable from "swr/immutable";

export const useSuspenseImage = (src: string | undefined) => {
  const { data } = useSWRImmutable(
    ["image", src],
    (key, src: string | undefined) => {
      return new Promise<HTMLImageElement>((resolve) => {
        if (src) {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = src;
        }
      });
    },
    { suspense: true }
  );

  return data;
};

export const ImageSuspenseLoad = ({ src }: { src?: string }) => {
  useSuspenseImage(src);

  return <></>;
};

export type AspectRatioImageProps = AspectRatioProps & {
  src?: string;
  alt?: string;
};

export const AspectRatioImage = ({
  src,
  alt,
  ...ratio
}: AspectRatioImageProps) => {
  return (
    <Suspense
      fallback={
        <Skeleton>
          <AspectRatio {...ratio}>
            <ChakraImage />
          </AspectRatio>
        </Skeleton>
      }
    >
      <ImageSuspenseLoad src={src} />
      <AspectRatio {...ratio}>
        <ChakraImage src={src} alt={alt} objectFit="cover" />
      </AspectRatio>
    </Suspense>
  );
};

export type ImageBoxProps = ComponentProps<ChakraComponent<"div", {}>> & {
  src?: string;
  alt?: string;
};

export const ImageBox = ({ src, alt, ...box }: ImageBoxProps) => {
  return (
    <Suspense
      fallback={
        <Skeleton>
          <Box {...box}/>
        </Skeleton>
      }
    >
      <ImageSuspenseLoad src={src} />
      <Box {...box}>
        <ChakraImage
          objectFit="contain"
          width="100%"
          height="100%"
          src={src}
          alt={alt}
        />
      </Box>
    </Suspense>
  );
};
