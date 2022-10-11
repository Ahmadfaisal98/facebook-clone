import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Header from '../../components/header';
import CreatePost from '../../components/createPost';
import Post from '../../components/post';
import Intro from '../../components/intro';

import Cover from './Cover';
import ProfilePictureInfos from './ProfilePictureInfos';
import ProfileMenu from './ProfileMenu';
import PplYouMayKnow from './PplYouMayKnow';
import GridPosts from './GridPosts';
import Photos from './Photos';
import Friends from './Friends';

import { useProfileUserQuery } from '../../services/userApi';
import { useListImagesQuery } from '../../services/uploadApi';
import { useGetAllPostQuery } from '../../services/postApi';
import './style.scss';

export default function Profile({ setVisible }) {
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();

  const check = useMediaQuery({
    query: '(min-width:901px)',
  });

  const { username } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { data: dataPost } = useGetAllPostQuery();
  const posts = dataPost?.filter((e) => e.user._id === user.id);

  const userName = username || user.username;
  const visitor = userName !== user.username;

  const profileTop = useRef(null);
  const leftSide = useRef(null);

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

  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    const getScroll = () => {
      setScrollHeight(window.pageYOffset);
    };

    window.addEventListener('scroll', getScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', getScroll, { passive: true });
    };
  }, [scrollHeight]);

  return (
    <div className='profile'>
      <Header page='profile' />
      <div className='profile_top' ref={profileTop}>
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
            <div
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? 'scrollFixed showLess'
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    'scrollFixed showMore'
              }`}
            >
              <div className='profile_left' ref={leftSide}>
                <Intro details={profile?.details} visitor={visitor} />
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
                  {posts?.length > 0 ? (
                    posts.map((post) => (
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
