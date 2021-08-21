import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { ItemListContainer } from "./components/ItemListContainer";
import { CustomTheme } from "./CustomTheme";

const theme = extendTheme(CustomTheme)

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Layout>
        <ItemListContainer greeting={"Hello World!"} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
