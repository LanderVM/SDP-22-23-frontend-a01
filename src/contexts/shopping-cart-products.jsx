import React, {
  createContext,
  useCallback, useEffect, useMemo, useState,
} from 'react';

export const ShoppingCartProducts = createContext();

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
    setProducts(productsFromContext.filter((el) => el.productId !== productId));
  }, [productsFromContext]);

  const addProductToShoppingCartContext = useCallback((product, amount) => {
    const productId = product.product_id;
    const updatedCart = productsFromContext.filter((element) => element.productId !== productId);

    setProducts([...updatedCart, { productId, amount }]);
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
    <ShoppingCartProducts.Provider value={value}>
      {children}
    </ShoppingCartProducts.Provider>
  );
}
