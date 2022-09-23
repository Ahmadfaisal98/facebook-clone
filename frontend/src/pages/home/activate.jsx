import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import ActivateForm from './ActivateForm';
import { useActivateMutation } from '../../services/serverApi';
import { updateUser } from '../../features/userSlice';
import './style.scss';

export default function Activate() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [postActivate, { error, isError, isSuccess, data, isLoading }] =
    useActivateMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  useEffect(() => {
    postActivate({ token }).then(({ data }) => {
      if (data.message === 'Account has been activated successfully') {
        // setTimeout(() => {
        //   dispatch(updateUser({ verified: true, token, ...data.user }));
        //   localStorage.setItem('token', token);
        //   navigate('/');
        // }, 2000);
      }
    });
  }, []);

  return (
    <div className='home'>
      {isSuccess && (
        <ActivateForm
          type='success'
          header='Account verification succeed.'
          text={data?.message}
          loading={loading}
        />
      )}
      {isError && (
        <ActivateForm
          type='error'
          header='Account verification failed.'
          text={error?.data?.message}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className='home_middle'>
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
