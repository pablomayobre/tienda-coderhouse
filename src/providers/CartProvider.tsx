import { createContext, useContext, useMemo, useReducer } from "react";

export type PartialCartItem = {
  itemId: string;
  variants: Record<string, string>;
};

export type CartItem = PartialCartItem & {
  quantity: number;
};

export type Cart = {
  list: CartItem[];
  totalQuantity: number;
  addToCart: (item: CartItem) => void;
  subtractFromCart: (item: CartItem) => void;
  removeFromCart: (item: PartialCartItem) => void;
  clearCart: () => void;
  isInCart: (item: PartialCartItem) => boolean;
};

const getItemKey = (item: PartialCartItem): string => {
  const variants = Object.entries(item.variants)
    .map(([name, variant]) => `${name}: ${variant}`)
    .sort()
    .join(", ");
  return `${item.itemId} -  (${variants})`;
};

type CartAction =
  | { type: "add"; item: CartItem }
  | { type: "subtract"; item: CartItem }
  | { type: "remove"; item: PartialCartItem }
  | { type: "clear" };

const CartReducer = (
  cart: Record<string, CartItem>,
  action: CartAction
): Record<string, CartItem> => {
  const newCart = { ...cart };

  switch (action.type) {
    case "add": {
      const key = getItemKey(action.item);
      if (newCart[key]) {
        newCart[key].quantity += action.item.quantity ?? 0;
      } else {
        newCart[key] = action.item;
      }
      return newCart;
    }
    case "subtract": {
      const key = getItemKey(action.item);
      if (newCart[key]) {
        newCart[key].quantity -= action.item.quantity ?? 0;
      }
      return newCart;
    }
    case "remove": {
      const key = getItemKey(action.item);
      if (newCart[key]) {
        delete newCart[key];
      }
      return newCart;
    }
    case "clear":
      return {};
    default:
      return cart;
  }
};

const noop = () => {};

const CartContext = createContext<Cart>({
  list: [],
  totalQuantity: 0,
  addToCart: noop,
  subtractFromCart: noop,
  removeFromCart: noop,
  clearCart: noop,
  isInCart: () => false,
});

export const CartProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, {});

  const { list, totalQuantity, isInCart } = useMemo(() => {
    const list = Object.values(state);

    const totalQuantity = list.reduce(
      (prev, current) => prev + current.quantity,
      0
    );

    const isInCart = (item: PartialCartItem) => {
      return Boolean(state[getItemKey(item)]);
    };

    return { list, totalQuantity, isInCart };
  }, [state]);

  const { addToCart, subtractFromCart, clearCart, removeFromCart } = useMemo(
    () => ({
      addToCart(item: CartItem) {
        dispatch({ type: "add", item });
      },

      subtractFromCart(item: CartItem) {
        dispatch({ type: "subtract", item });
      },

      clearCart() {
        dispatch({ type: "clear" });
      },

      removeFromCart(item: PartialCartItem) {
        dispatch({ type: "remove", item });
      },
    }),
    [dispatch]
  );

  return (
    <CartContext.Provider
      value={{
        list,
        totalQuantity,
        isInCart,
        addToCart,
        subtractFromCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
