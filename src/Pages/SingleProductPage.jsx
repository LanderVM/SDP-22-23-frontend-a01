import { useParams } from 'react-router';

import SingleProduct from '../Components/products/singleProduct'


export const SingleProductPage = () => {
    const { id } = useParams();
    
    return (
        <div>
            
            <SingleProduct id={id} />
        </div>
    )
}