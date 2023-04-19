import { useNavigate } from "react-router";
import ShoppingCartOverview from "./ShoppingCartOverview";
import ShoppingCartContent from "./ShoppingCartContent"
import {useContext, useState,useEffect, useCallback} from 'react';
import useProducts from './api/product';
import ProductsForShoppingCartContext from './Contexts/ProductsForShoppingCartContext';
import useOrders from "../../api/order";

export default function ShoppingCart () {

  const navigate = useNavigate();

  const productsApi = useProducts();

  const [products,setProducts] = useState([]);
  const [productsAmount,setProductsAmount]= useState([]);
  const [totalPrice,setTotalPrice] = useState(0.0);
  const [numberOfArticles,setNumberOfArticles] = useState(0);

  const ordersApi = useOrders();

  const {productsFromContext,removeProductFromShoppingCartContext,
    resetShoppingCartContext} = useContext(ProductsForShoppingCartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productsApi.getAll();
      data.filter((el) => productsFromContext.forEach((item) => item === el.id));
      setProducts(data);
    };
    fetchProducts();
  }, [productsApi, productsFromContext]);

  useEffect(()=>{
    products.forEach(el=>{
      const isPresent =  productsAmount.forEach(item=>{
        if (el.product_id===item.id) {
          return true;
        }})
      if (!isPresent) {
        setProductsAmount(...productsAmount,{id:el.product_id,amount:1})
      }
    });
  },[products,productsAmount]);

  useEffect(()=>{
    setTotalPrice(products.reduce((pv,el)=>{
      return pv + el.price;
    },0))
  },[products])

  useEffect(()=>{
    setNumberOfArticles(products.reduce((pv,el)=>{
      return pv = pv +1;
    },0))
  },[products])

  const removeProduct = useCallback((id)=>{
    removeProductFromShoppingCartContext(id);
    productsAmount.filter(el=>el.id!==id);
  },[productsAmount,removeProductFromShoppingCartContext]);

  const increaseProduct = useCallback((id,amount)=>{
    productsAmount.forEach(el=>{
      if (el.id===id) {
        el.amount = amount;
      }
    })
  },[productsAmount])

  const shipping = 20.0;

  const handlePurchase =  (location) => {
    const order = {
      products:productsAmount,
      location:location
    }
    ordersApi.save(order);
    resetShoppingCartContext();
    navigate('/thankyouScreen');
    
  };

  return (
    <div>
    <ShoppingCartContent onRemove={removeProduct} onIncrease={increaseProduct} products= {products} productsAmount={productsAmount}/>
    <ShoppingCartOverview numberOfArticles={numberOfArticles} priceArticles={totalPrice} shippingCost={shipping} onPurchase={handlePurchase}/>
    </div>
  );
}