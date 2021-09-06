import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
// import { ItemListContainer } from "./components/ItemListContainer";
import { CustomTheme } from "./CustomTheme";

const theme = extendTheme(CustomTheme);

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Layout>
        <ItemDetailContainer id="zapatillas-vans"/>
        {/* <ItemListContainer title="Productos" category="all" /> */}
      </Layout>
    </ChakraProvider>
  );
}

export default App;
