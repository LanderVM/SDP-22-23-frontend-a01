import React, { useContext } from 'react';
import { ProductsForShoppingCartContext } from '../../Contexts/ProductsForShoppingCartContext';

function GetAmount(productId) {
  const { productsFromContext } = useContext(ProductsForShoppingCartContext);

  return productsFromContext.forEach((el) => {
    if (el.id === productId) {
      return el.amount;
    }
    return null;
  });
}

function MapProducts(products) {
  const {
    removeProductFromShoppingCartContext,
    increaseProduct,
    decreaseProduct,
  } = useContext(ProductsForShoppingCartContext);

  return products.map((el) => {
    const handleOnDelete = () => {
      removeProductFromShoppingCartContext(el.id);
    };

    const handleIncrease = () => {
      increaseProduct(el.id);
    };

    const handleDecrease = () => {
      decreaseProduct(el.id);
    };
    return (
      <>
        <td>{el.name}</td>
        <td>{GetAmount(el.id)}</td>
        <td>
          <button type="button" onClick={handleIncrease}>Increase amount</button>
          <button type="button" onClick={handleDecrease}>Decrease amount</button>
        </td>
        <td>
          <button type="button" onClick={handleOnDelete}>Remove product</button>
        </td>
      </>
    );
  });
}

export default function ProductsTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Product name</th>
          <th>Amount</th>
          <th>Increase/Decrease</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
        {MapProducts(products)}
      </tbody>
    </table>
  );
}
