import { useState, useEffect } from "react";
import useProducts from "../../api/product";
import SingleProductElement from "./singleProductElement";
import Loader from "../Loader";
import Error from "../Error";

function SingleProductE({ product }) {

    if (!product || product == null) {
        return (
            <div>
                something went wrong
            </div>
        )
    }

    return (
        <div style={{margin: '100px 10%'}}>  
            <SingleProductElement {...product} /> 
        </div>
    )

}

export default function SingleProduct({ id }) {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const productenApi = useProducts();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productenApi.getById(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [])

    return (
        <>
        <Loader loading={loading} />
        <Error error={error} />
        {!loading && !error ? <SingleProductE product={product}/> : null}
        </>
    )
}