import './Profile.css';
import { useUser } from '../../UserProvider';

const Profile = () => {
    const { user } = useUser()
    return (
        <div>
            <img src={user && user.image ? user.image : "/person-round-svgrepo-com.svg"} alt="Person" className='profile' />
        </div>
    )
}

export default Profile