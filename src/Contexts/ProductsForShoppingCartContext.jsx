import React, {
  createContext,
  useCallback, useEffect, useMemo, useState,
} from 'react';

export const ProductsForShoppingCartContext = createContext();

export default function ProductsForShoppingCartProvider({ children }) {
  // test array om te zien of het ophalen van de items werkt
  const [productsFromContext, setProducts] = useState(() => JSON.parse(localStorage.getItem('productsFromContext')) || []);

  // test array dat toegeveoged wordt in add functie
  const product = {
    product_id: 2,
    name: 'test_product vijf',
    price: 11,
    stock: 5,
    description: 'omschrijning test_product 5',
    photo:
        'https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039',
    deliveryTime: '2d',
  };

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

  const addProductToShoppingCartContext = useCallback(() => {
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
