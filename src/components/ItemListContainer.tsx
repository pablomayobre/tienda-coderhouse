import { Box, Heading } from "@chakra-ui/react"
import { ItemList } from "./ItemList"

export const ItemListContainer = () => {
  return <Box paddingBottom={4}>
    <Heading as="h2" textAlign="center">Productos</Heading>
    <ItemList/>
  </Box>
}