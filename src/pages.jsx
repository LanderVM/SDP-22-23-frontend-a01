import {HomeNavigation} from "./Components/Home/HomeNavigation";
import {HomeWelcome} from "./Components/Home/HomeWelcome";
import PageNotFoundAlert from "./Components/PageNotFoundAlert";
import ProductsList from "./Components/products/productsList";
import {useAuth0} from '@auth0/auth0-react';
import { useParams } from 'react-router';
import SingleProduct from "./Components/products/singleProduct";
import {useContext, useEffect, useState} from "react";
import ProductsForShoppingCartContext from "./Contexts/ProductsForShoppingCartContext";
import useProducts from "./api/product";
import {ProductsTable} from "./Components/products/ProductsTable";

export const HomePage = () => {
    return (
        <main>
            <HomeWelcome/>
            <HomeNavigation/>
        </main>
    );
};

export const NotFoundPage = () => {
    return (
        <main>
            <PageNotFoundAlert/>
        </main>
    );
};

export const ProductsPage = () => {
    return (
        <main>
            <ProductsList/>
        </main>
    );
};

export const ProfilePage = () => {
    const {user, isAuthenticated} = useAuth0();

    return (
        <main>
            {isAuthenticated ?
                <div>Name: {user.email}</div>
                : <div></div>
            }
        </main>
    );
};

export const ProductOverviewPage = () => {
    const { id } = useParams();

    return (
        <main>
            <SingleProduct id={id}/>
        </main>
    );
};

export const ShoppingCartPage =  () => {

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
            });
            setProducts(data);
        };
        fetchProducts();
    },[productsApi, productsFromContext]);

    return (
        <>
            <h1>Welcome to your shopping-cart!</h1>
            {products.length===0?<p>There are no items in you shopping cart yet!</p>:<ProductsTable products="products"/>}
        </>
    );
};