import { useNavigate } from "react-router";
import ShoppingCartOverview from "./ShoppingCartOverview";
import {useContext, useState,useEffect} from 'react';
import useProducts from './api/product';
import ProductsForShoppingCartContext from './Contexts/ProductsForShoppingCartContext';



export default function ShoppingCart () {

  const navigate = useNavigate();

  const productsApi = useProducts();

  const [products,setProducts] = useState([]);
  const [productsAmount,setProductsAmount]= useState([]);

  const {productsFromContext} = useContext(ProductsForShoppingCartContext);

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
        if (item.id===el.product_id) {
          return true;
        }})
      if (!isPresent) {
        setProductsAmount(...productsAmount,{id:el.product_id,amount:1})
      }
    });
  },[products,productsAmount]);

  const noa = 3;
  const price = 200.88;
  const shipping = 20.0;

  const handlePurchase =  () => {
    navigate('/thankyouScreen');
  };

  return (
    <ShoppingCartOverview numberOfArticles={noa} priceArticles={price} shippingCost={shipping} onPurchase={handlePurchase}/>
  );
}