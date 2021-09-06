import {
  Box,
  Button,
  Heading,
  Skeleton,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";
import { useItem } from "../api/getItem";
import { formatCurrency } from "../api/helpers";
import { ColorVariantPicker } from "./ColorVariantPicker";
import { DropdownVariantPicker } from "./DropdownVariantPicker";
import { ItemCount } from "./ItemCount";
import { SuspendedImage } from "./SuspendedImage";

export const ItemDetail = ({ id }: { id: string }) => {
  const { item } = useItem(id);

  const variants = item.variants ? Object.entries(item.variants) : [];

  return (
    <Box minHeight="100vh">
      <Stack direction="row" justifyContent="center" flexGap={20}>
        <SuspendedImage
          src={item.pictureURL}
          alt=""
          ratio={1}
          minWidth="500px"
          flexGrow={0}
        />
        <Stack maxWidth="container.sm">
          <Heading as="h2">{item.title}</Heading>
          <Text fontSize="3xl">{formatCurrency(item.price)}</Text>
          {variants.map(([name, variant], index) => {
            return variant.type === "color" ? (
              <ColorVariantPicker key={index} variant={variant} variantName={name} />
            ) : <DropdownVariantPicker key={index} variant={variant} variantName={name} />;
          }) ?? null}
          <ItemCount max={item.stock} min={0} />
          <Text
            fontSize="sm"
            textAlign="right"
            sx={{ marginTop: "0!important" }}
          >
            {item.stock} unidades
          </Text>
          <Button>Agregar al Carrito</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export const ItemDetailSuspense = () => {
  return (
    <Box minHeight="100vh">
      <Stack direction="row" justifyContent="center" flexGap={20}>
        <SuspendedImage
          src=""
          alt=""
          ratio={1}
          minWidth="500px"
          flexGrow={0}
        />
        <Stack maxWidth="container.sm">
          <Skeleton><Heading as="h2">My item</Heading></Skeleton>
          <Skeleton><Text fontSize="3xl">$ 100.00</Text></Skeleton>
          <Skeleton><ItemCount max={0} min={0} /></Skeleton>
          <Skeleton><Text
            fontSize="sm"
            textAlign="right"
            sx={{ marginTop: "0!important" }}
          >
            100 unidades
          </Text></Skeleton>
          <Skeleton><Button>Agregar al Carrito</Button></Skeleton>
        </Stack>
      </Stack>
    </Box>
  );
};

export const ItemDetailError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Text fontSize="3xl">Hubo un error al cargar este producto</Text>
      <Button onClick={resetErrorBoundary}>Reintentar</Button>
    </Flex>
  );
};
