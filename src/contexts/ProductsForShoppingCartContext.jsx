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

  },[]);

  const decreaseProduct = useCallback ((productId)=>{

  },[]);

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