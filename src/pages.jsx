import {HomeNavigation} from "./Components/Home/HomeNavigation";
import {HomeWelcome} from "./Components/Home/HomeWelcome";
import PageNotFoundAlert from "./Components/PageNotFoundAlert";
import ProductsList from "./Components/products/productsList";

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