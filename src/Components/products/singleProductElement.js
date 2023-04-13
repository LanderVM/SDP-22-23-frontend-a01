export default function SingleProductElement({product_id, name, price, stock, description, photo, age}) {
    
    function toDate(date) {
        const newDate = new Date(date)
        return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()}`
    }

    return (
        <div className="container border border-danger rounded border-2 p-2">
            <div className="row p-4">
                <h2 className="col"><u>{name}</u></h2>
                <div className="row p-4">
                    <img src={photo} alt="product image" className="col float p-2 rounded-2" style={{width: '100px'}}></img>
                    <div className="col-8 g-5">       
                        <h3 className="col p-2">Description: {description}</h3>
                        <h3 className="col p-2">Price: ${price}</h3>  
                        <div className="col"></div>
                        <h3 className="col p-2">Age: {toDate(age)}</h3>
                        <h3 className="col p-2">Stock: {stock}</h3>   
                        <div className="col p-2"><button>Add to card</button></div>             
                    </div>   
                </div>         
            </div>
        </div>
    )

}