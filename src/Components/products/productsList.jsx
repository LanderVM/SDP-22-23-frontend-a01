import useProducts from "../../api/product";
import Error from "../Error";
import Loader from "../Loader";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Product from "./productElement";

function ProductsListElement({products, handleView}) {

    if(!products || products.length === 0) {
        return (
            <div>There are no products available</div>
        )
    }

    return (
        <div className="row align-items-start" style={{margin: "5%"}}>
            {products.map((product, pKey) => 
                <div className="card border border-danger border-2" style={{width: '300px', margin: '50px'}}>
                    <Product key={pKey} {...product} onView={handleView} />
                </div>
            )}
        </div>
    )
}

export default function ProductsList() {
    const [producten, setProducten] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const productenApi = useProducts();

    useEffect(() => {
        const fetchProducten = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productenApi.getAll();
                setProducten(data);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducten();
    }, [])

    const handleView = useCallback(async (idToView) => {
      try {
        setError(null);
        await productenApi.getById(idToView);
        navigate(`product/${idToView}`)
      } catch (err) {
        setError(err);
      }
    }, []);

    return (
        <>
        <Loader loading={loading} />
        <Error error={error} />
        {!loading && !error ? <ProductsListElement products={producten} handleView={handleView}/> : null}
        </>
    )
}