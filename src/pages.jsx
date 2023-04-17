import {HomeNavigation} from "./Components/Home/HomeNavigation";
import {HomeWelcome} from "./Components/Home/HomeWelcome";
import PageNotFoundAlert from "./Components/PageNotFoundAlert";

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
}