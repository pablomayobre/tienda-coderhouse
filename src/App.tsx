import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CustomTheme } from "./CustomTheme";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { CartProvider } from "./providers/CartProvider";
import { ApiProvider } from "./api";
import { NavBar } from "./components/NavBar";

const theme = extendTheme(CustomTheme);

const ItemListView = lazy(() => import("./views/ItemListView"));
const ItemDetailView = lazy(() => import("./views/ItemDetailView"));
const CartView = lazy(() => import("./views/CartView"));
const OrderView = lazy(() => import("./views/OrderView"));
const UserOrders = lazy(() => import("./views/UserOrders"))

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <BrowserRouter>
          <ApiProvider>
            <Header>
              <NavBar />
            </Header>

            <Layout>
              <Routes>
                <Route path="/" element={<ItemListView />} />
                <Route path="item/:id" element={<ItemDetailView />} />
                <Route path="category/:category" element={<ItemListView />} />
                <Route path="cart" element={<CartView />} />
                <Route path="order/:id" element={<OrderView/>}/>
                <Route path="user/orders" element={<UserOrders/>}/>
              </Routes>
            </Layout>
          </ApiProvider>
        </BrowserRouter>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
