import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../../components/header';
import Cover from './Cover';
import { useProfileUserQuery } from '../../services/userApi';
import ProfilePictureInfos from './ProfilePictureInfos';
import ProfileMenu from './ProfileMenu';
import './style.scss';

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userName = username ? username : user.username;

  const { data: profile, isError } = useProfileUserQuery(userName);

  useEffect(() => {
    if (isError) {
      navigate('/profile');
    }
  }, [isError]);

  return (
    <div className='profile'>
      <Header page='profile' />
      <div className='profile_top'>
        <div className='profile_container'>
          <Cover cover={profile?.cover} />
          <ProfilePictureInfos profile={profile} />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
