import { Box, Heading } from "@chakra-ui/react"

export const ItemListContainer = ({greeting}: {greeting?: string}) => {
  return <Box>
    <Heading>{greeting}</Heading>
  </Box>
}