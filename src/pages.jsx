import {HomeNavigation} from "./Components/Home/HomeNavigation";
import {HomeWelcome} from "./Components/Home/HomeWelcome";

export const HomePage = () => {
    return(
        <main>
            <HomeWelcome/>
            <HomeNavigation/>
        </main>
    )
};