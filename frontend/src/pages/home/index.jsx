import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';

import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import CreatePost from '../../components/createPost';
import SendVerification from '../../components/home/sendVerification';
import Post from '../../components/post';
import { useGetAllPostQuery } from '../../services/postApi';
import './style.scss';

export default function Home({ setVisible }) {
  const user = useSelector((state) => state.user);
  const { data: posts, isLoading } = useGetAllPostQuery();
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [middle, isLoading]);
  return (
    <div className='home' style={{ height: `${height + 150}px` }}>
      <Header page='home' />
      <LeftHome user={user} />
      <div className='home_middle' ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        {isLoading ? (
          <div className='skeleton_loader'>
            <HashLoader color='#1876f2' />
          </div>
        ) : (
          <div className='posts'>
            {posts?.map((post) => (
              <Post key={post._id} post={post} user={user} />
            ))}
          </div>
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
}
