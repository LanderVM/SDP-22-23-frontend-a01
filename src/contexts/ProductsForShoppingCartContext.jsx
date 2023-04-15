import { createContext, useCallback, useMemo, useState } from "react";


const ProductsForShoppingCartContext = createContext();

export default function ProductsForShoppingCartProvider ({children}) {

  const [productsFromContext,setProducts] = useState([]);

  const resetShoppingCartContext = useCallback(()=>{
    setProducts([]);
  },[])

  const removeProductFromShoppingCartContext = useCallback((productId)=>{
    productsFromContext.filter(el=>el.id!==productId);
  },[productsFromContext]);

  const addProductToShoppingCartContext = useCallback(({productId,amount})=>{
    const product = {productId,amount};
    setProducts([...productsFromContext,product]);
  },[productsFromContext]);

  const increaseProduct = useCallback ((productId)=>{
    const products = productsFromContext.filter(el=>el.id!==productId);
    let product = {};
    let array = [];
    productsFromContext.forEach(el=>{
      if (el.id===productId) {
        product = {
          id: el.id,
          amount: el.amount+1,
        }
        array = [...products,product];
        setProducts(array);
        
      }
    })
  },[productsFromContext]);

  const decreaseProduct = useCallback ((productId)=>{
    const products = productsFromContext.filter(el=>el.id!==productId);
    let product = {};
    let array = [];
    productsFromContext.forEach(el=>{
      if (el.id===productId) {
        product = {
          id: el.id,
          amount: el.amount-1,
        }
        array = [...products,product];
        setProducts(array);
        
      }
    })
  },[productsFromContext]);

  const value = useMemo(()=>({productsFromContext,resetShoppingCartContext,addProductToShoppingCartContext,
    removeProductFromShoppingCartContext,increaseProduct,decreaseProduct}),
  [productsFromContext,resetShoppingCartContext,addProductToShoppingCartContext,
    removeProductFromShoppingCartContext,increaseProduct,decreaseProduct]);

  return (
    <ProductsForShoppingCartContext.Provider value={value}>
      {children}
    </ProductsForShoppingCartContext.Provider>
  );
}