import {HomeNavigation} from "./Components/Home/HomeNavigation";
import {HomeWelcome} from "./Components/Home/HomeWelcome";
import PageNotFoundAlert from "./Components/PageNotFoundAlert";
import ProductsList from "./Components/products/productsList";
import {useAuth0} from '@auth0/auth0-react';

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

    if (!isAuthenticated)
        return (
            <main>
            </main>
        );

    return (
        <main>
            <div>Name: {user.email}</div>
        </main>
    )
}