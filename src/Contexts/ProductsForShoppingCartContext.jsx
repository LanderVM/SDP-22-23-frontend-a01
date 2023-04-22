import React, {
  createContext, useCallback, useMemo, useState,
} from 'react';

const ProductsForShoppingCartContext = createContext();

export default function ProductsForShoppingCartProvider({ children }) {
  const [productsFromContext, setProducts] = useState([]);

  const resetShoppingCartContext = useCallback(() => {
    setProducts([]);
  }, []);

  const removeProductFromShoppingCartContext = useCallback((productId) => {
    productsFromContext.filter((el) => el !== productId);
  }, [productsFromContext]);

  const addProductToShoppingCartContext = useCallback((productId) => {
    setProducts([...productsFromContext, productId]);
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
