import { useNavigate } from "react-router";
import ShoppingCartOverview from "./ShoppingCartOverview";



export default function ShoppingCart () {

  const navigate = useNavigate();

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