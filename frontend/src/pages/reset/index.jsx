import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginInput from '../../components/inputs/loginInput';
import SearchAccount from './SearchAccount';
import SendEmail from './SendEmail';
import CodeVerification from './CodeVerification';
import Footer from '../../components/login/Footer';
import { logout } from '../../features/userSlice';
import './style.scss';
import ChangePassword from './ChangePassword';

export default function Reset() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(3);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { code, setCode } = useState('');
  const [password, setPassword] = useState('');
  const [conf_password, setConf_password] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('persist:root');
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div className='reset'>
      <div className='reset_header'>
        <img src='../../../icons/facebook.svg' alt='' />
        {user ? (
          <div className='right_reset'>
            <Link to='/profile'>
              <img src={user.picture} alt='' />
            </Link>
            <button className='blue_btn' onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to='/login' className='right_reset'>
            <button className='blue_btn'>Login</button>
          </Link>
        )}
      </div>
      <div className='reset_wrap'>
        {visible === 0 && (
          <SearchAccount email={email} setEmail={setEmail} error={error} />
        )}
        {visible === 1 && <SendEmail user={user} />}
        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            setCode={setCode}
            error={error}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            conf_password={conf_password}
            setConf_password={setConf_password}
            setPassword={setPassword}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
