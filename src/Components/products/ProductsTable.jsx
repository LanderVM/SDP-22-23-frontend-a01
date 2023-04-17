import {useContext} from "react";
import ProductsForShoppingCartContext from "../../Contexts/ProductsForShoppingCartContext";

export const ProductsTable = ({products}) => {
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
            {mapProducts(products)}
            </tbody>
        </table>
    );
}

function mapProducts(products) {

    const {
        removeProductFromShoppingCartContext,
        increaseProduct,
        decreaseProduct
    } = useContext(ProductsForShoppingCartContext);

    return products.map(el => {
        const handleOnDelete = () => {
            removeProductFromShoppingCartContext(el.id)
        };

        const handleIncrease = () => {
            increaseProduct(el.id)
        };

        const handleDecrease = () => {
            decreaseProduct(el.id);
        };
        return (
            <>
                <td>{el.name}</td>
                <td>{getAmount(el.id)}</td>
                <td>
                    <button onClick={handleIncrease}>Increase amount</button>
                    <button onClick={handleDecrease}>Decrease amount</button>
                </td>
                <td>
                    <button onClick={handleOnDelete}>Remove product</button>
                </td>
            </>
        );
    });
}

function getAmount(productId) {

    const {productsFromContext} = useContext(ProductsForShoppingCartContext);

    return productsFromContext.forEach(el => {
        if (el.id === productId) {
            return el.amount;
        }
    });
}