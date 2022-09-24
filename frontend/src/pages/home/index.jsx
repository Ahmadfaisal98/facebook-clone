import { useSelector } from 'react-redux';

import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import CreatePost from '../../components/createPost';
import SendVerification from '../../components/home/sendVerification';
import './style.scss';

export default function Home() {
  const user = useSelector((state) => state.user);
  return (
    <div className='home'>
      <Header />
      <LeftHome user={user} />
      <div className='home_middle'>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
