import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../../components/header';
import Cover from './Cover';
import { useProfileUserQuery } from '../../services/userApi';
import ProfilePictureInfos from './ProfilePictureInfos';
import ProfileMenu from './ProfileMenu';
import PplYouMayKnow from './PplYouMayKnow';
import CreatePost from '../../components/createPost';
import GridPosts from './GridPosts';
import Post from '../../components/post';
import './style.scss';

export default function Profile({ setVisible }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userName = username ? username : user.username;
  const visitor = userName !== user.username;

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
          <Cover cover={profile?.cover} visitor={visitor} />
          <ProfilePictureInfos profile={profile} visitor={visitor} />
          <ProfileMenu />
        </div>
      </div>
      <div className='profile_bottom'>
        <div className='profile_container'>
          <div className='bottom_container'>
            <PplYouMayKnow />
            <div className='profile_grid'>
              <div className='profile_left'></div>
              <div className='profile_right'>
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}

                <GridPosts />
                <div className='posts'>
                  {profile?.posts?.length > 0 ? (
                    profile?.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} />
                    ))
                  ) : (
                    <div className='no_posts'>No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
