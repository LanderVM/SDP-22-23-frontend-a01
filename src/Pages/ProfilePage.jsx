
import { useAuth0 } from '@auth0/auth0-react';

export default function ProfilePage() {
    
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return (
            <div></div>
        )
    }

    return (
        <div>
            <div>Name: {user.email}</div>
        </div>
    )
}