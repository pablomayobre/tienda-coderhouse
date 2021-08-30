import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
// import { ItemDetailContainer } from "./components/ItemDetail";
import { ItemList } from "./components/ItemList";
import { CustomTheme } from "./CustomTheme";

const theme = extendTheme(CustomTheme);

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Layout>
        <ItemList title="Productos" category="all" />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
