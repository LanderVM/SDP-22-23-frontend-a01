import { useParams } from 'react-router';
import NavBar from '../components/NavBar';
import Header from '../components/Header';

export const ProfilePage = () => {
    const { id } = useParams();
    
    return (
        <div>
            <Header />
            <NavBar />
            <div>{id}</div>
        </div>
    )
}