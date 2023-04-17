import { useCallback } from "react";

export default function ProductElement({product_id, name, price, stock, description, photo, age, onView}) {
    
    const handleView = useCallback((e) => {
        e.preventDefault();
        onView(product_id);
    }, [product_id, onView]); 

    return (
        <span className="col card-body container" >
            <div className="row">
                <img src={photo} alt="product" className="p-2 rounded-2"></img>
                <div>
                    <h4 className="col">{name}</h4>
                    <div className="col">Price: {price}$</div>
                    <div className="row">
                        <div className="col">In Stock: {stock} </div> 
                        <div className="col text-end"><button onClick={handleView}>View</button></div>
                    </div>
                </div>
            </div>
           
        </span>
    )

}