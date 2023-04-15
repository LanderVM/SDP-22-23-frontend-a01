import { useLocation } from "react-router";


export default function PageNotFound() {

    const {pathName} = useLocation;

    return (
        <div>
            <div>Page not found!</div>
            <div>There is no page with url {pathName}</div>
        </div>
    )
}