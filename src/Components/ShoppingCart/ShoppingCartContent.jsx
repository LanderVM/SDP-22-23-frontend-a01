import { useContext } from 'react';

export default function ShoppingCartContent({
  cart, context,
}) {
  const {
    removeProductFromShoppingCartContext,
  } = useContext(context);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <table className="table table-image" style={{ borderColor: 'white' }}>

            <thead>
              <tr>

                <th scope="col">
                  {cart.name}
                </th>
                <th>.</th>
                <th>{cart.price}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-25" rowSpan={2}>
                  <img alt={cart.name} src={cart.photo} className="img-fluid img-thumbnail" height="60%" width="40%" />
                </td>

                <td>{cart.description}</td>
                <td><input type="number" name="amount" id="amount" value="1" /></td>
                <td width="200px">
                  <input type="button" defaultValue="Delete" onClick={() => removeProductFromShoppingCartContext(cart.product_id)} />
                </td>

              </tr>
              <tr>
                <td>{cart.stock > 0 ? 'In stock' : 'Not in stock'}</td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
