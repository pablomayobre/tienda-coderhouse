import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

export const SearchBar = () => {
  return (
    <InputGroup flexGrow={1} width="auto">
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={MdSearch} w={5} h={5} color="gray.300" />}
      />
      <Input type="tel" placeholder="Buscar producto" />
    </InputGroup>
  );
};
