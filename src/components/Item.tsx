import {
  Box,
  Skeleton,
  AspectRatio,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Suspense } from "react";
import { formatCurrency } from "../api/helpers";
import { ItemData } from "../api/types";
import { useSuspenseImage } from "../hooks/useSuspenseImage";

const ItemImage = ({ src, alt = "" }: { src: string; alt?: string }) => {
  useSuspenseImage(src);

  return (
    <AspectRatio ratio={1}>
      <Image src={src} alt={alt} objectFit="cover" />
    </AspectRatio>
  );
};

const ItemImageSkeleton = () => {
  return (
    <Skeleton>
      <AspectRatio ratio={1}>
        <Image />
      </AspectRatio>
    </Skeleton>
  );
};

export const Item = ({ item }: { item: ItemData }) => {
  return (
    <Box bg="white" borderRadius={6} shadow="xs" overflow="hidden">
      <Suspense fallback={<ItemImageSkeleton />}>
        <ItemImage src={item.pictureURL} alt="" />
      </Suspense>
      <Box paddingLeft={4} paddingRight={4} paddingTop={2} paddingBottom={4}>
        <Text fontSize="3xl">{formatCurrency(item.price)}</Text>
        <Heading as="h3" size="md">
          {item.title}
        </Heading>
      </Box>
    </Box>
  );
};

export const ItemSkeleton = () => {
  return (
    <Box bg="white" borderRadius={6} shadow="xs" overflow="hidden">
      <ItemImageSkeleton />
      <Box paddingLeft={4} paddingRight={4} paddingTop={2} paddingBottom={4}>
        <Skeleton marginBottom={1}>
          <Text fontSize="2xl">$100.00</Text>
        </Skeleton>
        <Skeleton>
          <Heading as="h3" size="md">
            Product Name
          </Heading>
        </Skeleton>
      </Box>
    </Box>
  );
};
