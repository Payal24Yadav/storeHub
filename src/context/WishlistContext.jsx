import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.some(i => i.id === action.payload.id)
        ? state
        : [...state, action.payload];
    case 'REMOVE':
      return state.filter(i => i.id !== action.payload);
    case 'TOGGLE':
      return state.some(i => i.id === action.payload.id)
        ? state.filter(i => i.id !== action.payload.id)
        : [...state, action.payload];
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(
    wishlistReducer,
    JSON.parse(localStorage.getItem('pvrs_wishlist') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('pvrs_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggle = (product) => dispatch({ type: 'TOGGLE', payload: product });
  const isWishlisted = (id) => wishlist.some(i => i.id === id);
  const remove = (id) => dispatch({ type: 'REMOVE', payload: id });

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted, remove }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider');
  return ctx;
};
