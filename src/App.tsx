import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CustomTheme } from "./CustomTheme";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";

const theme = extendTheme(CustomTheme);

const ItemListView = lazy(() => import("./views/ItemListView"));
const ItemDetailView = lazy(() => import("./views/ItemDetailView"));

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<ItemListView />} />
            <Route path="item/:id" element={<ItemDetailView />} />
            <Route path="category/:category" element={<ItemListView />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
