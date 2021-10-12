import {
  Box,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import { formatCurrency } from "../api/helpers";
import { ItemData } from "../api/types";
import { AspectRatioImage } from "./SuspendedImage";
import { Link } from "react-router-dom";

export const Item = ({ item }: { item: ItemData }) => {
  return (
    <Center >
    <LinkBox width="100%" bg="white" borderRadius={6} shadow="xs" overflow="hidden" maxWidth={250} justifyItems="center">
      <AspectRatioImage src={item.pictureURL} alt="" ratio={1} />
      <Box paddingLeft={4} paddingRight={4} paddingTop={2} paddingBottom={4}>
        <Text fontSize="3xl">{formatCurrency(item.price)}</Text>
        <Heading as="h3" size="md">
          <LinkOverlay as={Link} to={`/item/${item.id}`}>
            {item.title}
          </LinkOverlay>
        </Heading>
      </Box>
    </LinkBox>
    </Center>
  );
};

export const ItemSkeleton = () => {
  return (
    <Box bg="white" borderRadius={6} shadow="xs" overflow="hidden">
      <AspectRatioImage ratio={1} />
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
