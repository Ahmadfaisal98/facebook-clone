import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import LoginInput from '../../components/inputs/loginInput';
import { useChangePasswordMutation } from '../../services/userApi';

export default function ChangePassword({
  password,
  setPassword,
  conf_password,
  setConf_password,
  userInfos,
}) {
  const [changePassword, { error, isError }] = useChangePasswordMutation();
  const navigate = useNavigate();
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be at least 6 characters.')
      .max(36, "Password can't be more than 36 characters"),

    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });
  const handleSubmit = async () => {
    const { data } = await changePassword({
      password,
      confirmPassword: conf_password,
      email: userInfos.email,
    });

    if (data.status === 200) {
      navigate('/');
    }
  };
  return (
    <div className='reset_form' style={{ height: '310px' }}>
      <div className='reset_form_header'>Change Password</div>
      <div className='reset_form_text'>Pick a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }}
        validationSchema={validatePassword}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New password'
            />
            <LoginInput
              type='password'
              name='conf_password'
              onChange={(e) => setConf_password(e.target.value)}
              placeholder='Confirm new password'
              bottom
            />
            {isError && <div className='error_text'>{error.data.message}</div>}
            <div className='reset_form_btns'>
              <Link to='/login' className='gray_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
