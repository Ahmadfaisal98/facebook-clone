import LoginForm from '../../components/login/LoginForm';
import Footer from '../../components/login/Footer';
import RegisterForm from '../../components/login/RegisterForm';

import './style.scss';

export default function Login() {
  return (
    <div className='login' id='login'>
      <div className='login_wrapper'>
        <LoginForm />
        <RegisterForm />
        <Footer />
      </div>
    </div>
  );
}
