import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export type PartialCartData = {
  itemId: string;
  variants: Record<string, string>;
};

export type CartData = PartialCartData & {
  uniqueId: string;
  quantity: number;
};

export type Cart = {
  list: CartData[];
  totalQuantity: number;
  addQuantity: (item: CartData) => void;
  subtractQuantity: (item: CartData) => void;
  setQuantity: (item: CartData) => void;
  remove: (item: PartialCartData) => void;
  removeAllWithId: (id: string) => void;
  clear: () => void;
  isInCart: (item: PartialCartData) => boolean;
};

export const getItemKey = (item: PartialCartData): string => {
  const variants = Object.entries(item.variants)
    .map(([name, variant]) => `${name}: ${variant}`)
    .sort()
    .join(", ");
  return `${item.itemId} -  (${variants})`;
};

type CartAction =
  | { type: "addQuantity"; item: CartData }
  | { type: "subtractQuantity"; item: CartData }
  | { type: "setQuantity"; item: CartData }
  | { type: "remove"; item: PartialCartData }
  | { type: "removeAllWithId"; id: string }
  | { type: "clear" };

const CartReducer = (
  cart: Record<string, CartData>,
  action: CartAction
): Record<string, CartData> => {
  const newCart = { ...cart };

  switch (action.type) {
    case "addQuantity": {
      const key = getItemKey(action.item);
      if (newCart[key]) {
        newCart[key].quantity += action.item.quantity ?? 0;
      } else {
        newCart[key] = action.item;
      }
      return newCart;
    }
    case "subtractQuantity": {
      const key = getItemKey(action.item);
      if (newCart[key]) {
        newCart[key].quantity -= action.item.quantity ?? 0;
      }
      return newCart;
    }
    case "setQuantity": {
      const key = getItemKey(action.item);
      if (newCart[key]) {
        newCart[key].quantity = action.item.quantity ?? 0;
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
    case "removeAllWithId":
      return Object.fromEntries(
        Object.entries(newCart).filter(
          ([name, item]) => item.itemId !== action.id
        )
      );
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
  isInCart: () => false,
  addQuantity: noop,
  subtractQuantity: noop,
  setQuantity: noop,
  remove: noop,
  removeAllWithId: noop,
  clear: noop,
});

const LOCALSTORAGE_CART_DATA = "cartData";

export const CartProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    CartReducer,
    {},
    (initial): Record<string, CartData> => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(LOCALSTORAGE_CART_DATA);
        // Parse stored json or if none return initialValue
        return item ? (JSON.parse(item) as Record<string, CartData>) : initial;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initial;
      }
    }
  );

  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_CART_DATA, JSON.stringify(state));
  }, [state]);

  const { list, totalQuantity, isInCart } = useMemo(() => {
    const list = Object.values(state);

    const totalQuantity = list.reduce(
      (prev, current) => prev + current.quantity,
      0
    );

    const isInCart = (item: PartialCartData) => {
      return Boolean(state[getItemKey(item)]);
    };

    return { list, totalQuantity, isInCart };
  }, [state]);

  const {
    addQuantity,
    subtractQuantity,
    setQuantity,
    remove,
    removeAllWithId,
    clear,
  } = useMemo(
    () => ({
      addQuantity(item: CartData) {
        dispatch({ type: "addQuantity", item });
      },

      subtractQuantity(item: CartData) {
        dispatch({ type: "subtractQuantity", item });
      },

      setQuantity(item: CartData) {
        dispatch({ type: "setQuantity", item });
      },

      remove(item: PartialCartData) {
        dispatch({ type: "remove", item });
      },

      removeAllWithId(id: string) {
        dispatch({ type: "removeAllWithId", id });
      },

      clear() {
        dispatch({ type: "clear" });
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
        addQuantity,
        subtractQuantity,
        setQuantity,
        remove,
        removeAllWithId,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
