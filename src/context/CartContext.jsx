import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'INCREASE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case 'DECREASE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload
            ? { ...i, quantity: Math.max(1, i.quantity - 1) }
            : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    default:
      return state;
  }
};

const initialState = {
  items: JSON.parse(localStorage.getItem('pvrs_cart') || '[]'),
  coupon: null,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('pvrs_cart', JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = state.coupon ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const increaseQty = (id) => dispatch({ type: 'INCREASE_QTY', payload: id });
  const decreaseQty = (id) => dispatch({ type: 'DECREASE_QTY', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const applyCoupon = (code) => dispatch({ type: 'APPLY_COUPON', payload: code });
  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });

  return (
    <CartContext.Provider value={{ items: state.items, coupon: state.coupon, totalItems, subtotal, discount, total, addItem, removeItem, increaseQty, decreaseQty, clearCart, applyCoupon, removeCoupon }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
