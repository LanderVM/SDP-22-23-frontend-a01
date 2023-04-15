import { useCallback } from 'react';
import {BsCart}  from "react-icons/bs";
import { useNavigate } from 'react-router';


export default function ShoppingCartIcon () {

  const navigate = useNavigate();

  const handleClickCart =useCallback( (e) =>{
    e.stopPropagation();
    navigate('/shoppingCart')
  },[navigate]);

  return (
    <BsCart onClick={handleClickCart}/>
  );
}