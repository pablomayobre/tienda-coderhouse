import {
  Box,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Heading,
  Text,
} from "@chakra-ui/react";
import { formatCurrency } from "../api/helpers";
import { ItemData } from "../api/types";
import { ImageSkeleton, SuspendedImage } from "./SuspendedImage";
import { Link } from "react-router-dom";

export const Item = ({ item }: { item: ItemData }) => {
  return (
    <LinkBox bg="white" borderRadius={6} shadow="xs" overflow="hidden">
      <SuspendedImage src={item.pictureURL} alt="" ratio={1} />
      <Box paddingLeft={4} paddingRight={4} paddingTop={2} paddingBottom={4}>
        <Text fontSize="3xl">{formatCurrency(item.price)}</Text>
        <Heading as="h3" size="md">
          <LinkOverlay as={Link} to={`/item/${item.id}`}>
            {item.title}
          </LinkOverlay>
        </Heading>
      </Box>
    </LinkBox>
  );
};

export const ItemSkeleton = () => {
  return (
    <Box bg="white" borderRadius={6} shadow="xs" overflow="hidden">
      <ImageSkeleton ratio={1} />
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
