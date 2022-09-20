import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DotLoader from 'react-spinners/DotLoader';

import LoginInput from '../inputs/loginInput';
import { useLoginMutation } from '../../services/serverApi';
import { setToLogin } from '../../features/userSlice';

export default function LoginForm({ setVisible }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const { email, password } = login;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postLogin, { error, isError, isLoading }] = useLoginMutation();

  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Must be a valid email.')
      .max(100),
    password: Yup.string().required('Password is required'),
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async () => {
    const result = await postLogin(login);
    if (result.data.status === 200) {
      localStorage.setItem('token', result.data.user.token);
      dispatch(setToLogin({ ...result.data.user }));
      navigate('/');
    }
  };

  return (
    <div className='login_wrap'>
      <div className='login_1'>
        <img src='../../icons/facebook.svg' alt='' />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className='login_2'>
        <div className='login_2_wrap'>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type='text'
                  name='email'
                  placeholder='Email address or phone number'
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={handleLoginChange}
                  bottom
                />
                <button type='submit' className='blue_btn'>
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to='/forgot' className='forgot_password'>
            Forgotten password?
          </Link>
          <DotLoader color='#1876f2' loading={isLoading} size={30} />
          {isError && <div className='error_text'>{error.data.message}</div>}
          <div className='sign_splitter'></div>
          <button
            className='blue_btn open_signup'
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to='/' className='sign_extra'>
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
