import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Header from '../../components/header';
import Cover from './Cover';
import ProfilePictureInfos from './ProfilePictureInfos';
import ProfileMenu from './ProfileMenu';
import PplYouMayKnow from './PplYouMayKnow';
import CreatePost from '../../components/createPost';
import GridPosts from './GridPosts';
import Post from '../../components/post';
import Photos from './Photos';
import Friends from './Friends';
import { useProfileUserQuery } from '../../services/userApi';
import { useListImagesQuery } from '../../services/uploadApi';
import './style.scss';

export default function Profile({ setVisible }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userName = username || user.username;
  const visitor = userName !== user.username;

  const payload = {
    path: `${userName}/*`,
    max: 30,
    sort: 'desc',
  };
  const { data: photos } = useListImagesQuery(payload);
  const { data: profile, isError } = useProfileUserQuery(userName);

  useEffect(() => {
    if (isError) {
      navigate('/profile');
    }
  }, [isError, navigate]);

  return (
    <div className='profile'>
      <Header page='profile' />
      <div className='profile_top'>
        <div className='profile_container'>
          <Cover
            cover={profile?.cover}
            visitor={visitor}
            photos={photos?.resources}
          />
          <ProfilePictureInfos
            profile={profile}
            visitor={visitor}
            photos={photos?.resources}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className='profile_bottom'>
        <div className='profile_container'>
          <div className='bottom_container'>
            <PplYouMayKnow />
            <div className='profile_grid'>
              <div className='profile_left'>
                <Photos username={userName} photos={photos} />
                <Friends friends={profile?.friends} />
                <div className='relative_fb_copyright'>
                  <Link to='/'>Privacy </Link>
                  <span>. </span>
                  <Link to='/'>Terms </Link>
                  <span>. </span>
                  <Link to='/'>Advertising </Link>
                  <span>. </span>
                  <Link to='/'>
                    Ad Choices <i className='ad_choices_icon'></i>{' '}
                  </Link>
                  <span>. </span>
                  <Link to='/'></Link>Cookies <span>. </span>
                  <Link to='/'>More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className='profile_right'>
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}

                <GridPosts />
                <div className='posts'>
                  {profile?.posts?.length > 0 ? (
                    profile?.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} profile />
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
