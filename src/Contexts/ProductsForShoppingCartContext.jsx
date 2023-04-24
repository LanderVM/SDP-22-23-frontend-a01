import React, {
  createContext,
  useCallback, useEffect, useMemo, useState,
} from 'react';

export const ProductsForShoppingCartContext = createContext();

export default function ProductsForShoppingCartProvider({ children }) {
  const [productsFromContext, setProducts] = useState(() => JSON.parse(localStorage.getItem('productsFromContext')) || []);

  useEffect(() => {
    const cartItemsData = JSON.parse(localStorage.getItem('productsFromContext'));
    if (cartItemsData) {
      setProducts(cartItemsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('productsFromContext', JSON.stringify(productsFromContext));
  }, [productsFromContext]);

  const resetShoppingCartContext = useCallback(() => {
    setProducts([]);
  }, []);

  const removeProductFromShoppingCartContext = useCallback((productId) => {
    console.log('testRemove');
    setProducts(productsFromContext.filter((el) => el.product_id !== productId));
  }, [productsFromContext]);

  const addProductToShoppingCartContext = useCallback((product) => {
    console.log('testAdd');

    setProducts([...productsFromContext, product]);
  }, [productsFromContext]);

  const value = useMemo(
    () => ({
      productsFromContext,
      resetShoppingCartContext,
      addProductToShoppingCartContext,
      removeProductFromShoppingCartContext,
    }),
    [productsFromContext, resetShoppingCartContext, addProductToShoppingCartContext,
      removeProductFromShoppingCartContext],
  );

  return (
    <ProductsForShoppingCartContext.Provider value={value}>
      {children}
    </ProductsForShoppingCartContext.Provider>
  );
}
