import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfileUserQuery } from '../../services/userApi';

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userName = username ? username : user.username;

  const { data, isError } = useProfileUserQuery(userName);

  useEffect(() => {
    if (isError) {
      navigate('/profile');
    }
  }, [isError]);

  return <div>profile</div>;
}
