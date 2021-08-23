import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { ItemListContainer } from "./components/ItemListContainer";
import { CustomTheme } from "./CustomTheme";
import { ItemCount } from "./components/ItemCount";

const theme = extendTheme(CustomTheme);

function App() {
  const stock = 10;

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Layout>
        <ItemListContainer greeting={"Hello World!"} />
        <ItemCount
          min={0}
          max={stock}
          onChange={(value) => console.log(value)}
        />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
