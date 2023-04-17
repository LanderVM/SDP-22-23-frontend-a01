import { useLocation } from "react-router";

export default function PageNotFoundAlert() {

    const {pathName} = useLocation;

    return (
        <>
            <div>Page not found!</div>
            <div>There is no page with url {pathName}</div>
        </>
    )
}