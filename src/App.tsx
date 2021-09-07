import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { ItemListContainer } from "./components/ItemListContainer";
import { CustomTheme } from "./CustomTheme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const theme = extendTheme(CustomTheme);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="item/:id" element={<ItemDetailContainer />} />
            <Route path="category/:category" element={<ItemListContainer />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
