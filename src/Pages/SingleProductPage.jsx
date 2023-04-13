import { useParams } from 'react-router';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import SingleProduct from '../components/products/singleProduct'


export const SingleProductPage = () => {
    const { id } = useParams();
    
    return (
        <div>
            <Header />
            <NavBar />
            <SingleProduct id={id} />
        </div>
    )
}