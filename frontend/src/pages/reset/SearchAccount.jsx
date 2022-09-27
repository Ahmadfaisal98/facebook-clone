import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import LoginInput from '../../components/inputs/loginInput';
import { useFindUserMutation } from '../../services/userApi';

export default function SearchAccount({
  email,
  setEmail,
  setVisible,
  setUserInfos,
}) {
  const [findUser, { isError, isLoading, error, data: dataUser }] =
    useFindUserMutation();

  const validateEmail = Yup.object({
    email: Yup.string()
      .required('Email address ir required.')
      .email('Must be a valid email address.')
      .max(50, "Email address can't be more than 50 characters."),
  });

  const handleSubmit = async () => {
    const { data } = await findUser({ email });
    if (data.status === 200) {
      setUserInfos(data);
      setVisible(1);
    }
  };

  return (
    <div className='reset_form'>
      <div className='reset_form_header'>Find Your Account</div>
      <div className='reset_form_text'>
        Please enter your email address or mobile number to search for your
        account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='text'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email address or phone number'
            />
            {isError && <div className='error_text'>{error.data.message}</div>}
            <div className='reset_form_btns'>
              <Link to='/login' className='gray_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
