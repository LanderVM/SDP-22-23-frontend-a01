import { useContext, useEffect } from "react";
import { useState } from "react";
import useProducts from "../api/product";
import ProductsForShoppingCartContext from "../Contexts/ProductsForShoppingCartContext";


export default function ShoppingCartPage () {

  const [products,setProducts] = useState([]);

  const {productsFromContext, resetShoppingCartContext} = useContext(ProductsForShoppingCartContext);

  const productsApi = useProducts();

  useEffect(()=>{
    const fetchProducts = async () => {
      const data = await productsApi.getAll();
      data.filter(el=> {
        return productsFromContext.forEach(item=>{
          if (item.productId === el.id) {
            return true;
          }
        })
      })
      setProducts(data)
    };
    fetchProducts();
  },[productsApi,productsFromContext]);

  return (
    <>
    <h1>Welcome to your shoppingcart!</h1>
    {products.length===0?<p>There are no items in you shopping cart yet!</p>:<ProductsTable products="products"/>}
    </>
  );
  
  

}
const  ProductsTable = ({products})=>{

    const {removeProductFromShoppingCartContext,increaseProduct,decreaseProduct} = useContext(ProductsForShoppingCartContext);


    return (
      <table>
        <tr>
        <th>Product name</th>
        <th>Amount</th>
        <th>Increase/Decrease</th>
        <th>remove</th>
        </tr>
        {products.map(el=>{

          const handleOnDelete = ()=>{
            removeProductFromShoppingCartContext(el.id)
          }

          const handleIncrease = ()=>{
            increaseProduct(el.id)
          }

          const handleDecrease = () => {
            decreaseProduct(el.id);
          }

          return (
            <>
            <td>{el.name}</td>
            <td>{GetAmountForProductId(el.id)}</td>
            <td><button onClick={handleIncrease}>Increase amount</button>
            <button onClick={handleDecrease}>Decrease amount</button></td>
            <td><button onClick={handleOnDelete} >Remove product</button></td>
            </>
          );
        })}
      </table>
    );
}

function GetAmountForProductId (productId) {

  const {productsFromContext} = useContext(ProductsForShoppingCartContext);

  return productsFromContext.forEach(el=>{
    if (el.id===productId) {
      return el.amount;
    }
  });
}