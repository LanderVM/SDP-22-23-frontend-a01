import {HomeNavigation} from "./Components/Home/HomeNavigation";
import {HomeWelcome} from "./Components/Home/HomeWelcome";
import PageNotFoundAlert from "./Components/PageNotFoundAlert";
import ProductsList from "./Components/products/productsList";
import {useAuth0} from '@auth0/auth0-react';
import { useParams } from 'react-router';
import SingleProduct from "./Components/products/singleProduct";

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