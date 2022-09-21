import { useSelector } from 'react-redux';

import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import './style.scss';

export default function Home() {
  const user = useSelector((state) => state.user);
  return (
    <div className='home'>
      <Header />
      <LeftHome user={user} />
      <div className='home_middle'>
        <Stories />
      </div>
      <RightHome user={user} />
    </div>
  );
}
