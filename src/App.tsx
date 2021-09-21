import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CustomTheme } from "./CustomTheme";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { CartProvider } from "./providers/CartProvider";

const theme = extendTheme(CustomTheme);

const ItemListView = lazy(() => import("./views/ItemListView"));
const ItemDetailView = lazy(() => import("./views/ItemDetailView"));
const CartView = lazy(() => import("./views/CartView"));

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<ItemListView />} />
              <Route path="item/:id" element={<ItemDetailView />} />
              <Route path="category/:category" element={<ItemListView />} />
              <Route path="cart" element={<CartView/>}/>
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
