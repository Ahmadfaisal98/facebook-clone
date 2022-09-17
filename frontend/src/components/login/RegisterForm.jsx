import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import RegisterInput from '../inputs/registerInput';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';

export default function RegisterForm() {
  const userInfos = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  };
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const years = Array.from(new Array(108), (val, index) => ({
    year: yearTemp - index,
    key: index,
  }));
  const months = Array.from(new Array(12), (val, index) => ({
    month: 1 + index,
    key: index,
  }));
  const getDays = () => new Date(bYear, bMonth, 0).getDate();
  const days = Array.from(new Array(getDays()), (val, index) => ({
    day: 1 + index,
    key: index,
  }));

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, 'Last name must be between 2 and 16 characters.')
      .max(16, 'Last name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be at least 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
  });

  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon'></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='register_line'>
                <RegisterInput
                  type='text'
                  placeholder='First name'
                  name='first_name'
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type='text'
                  placeholder='Surname'
                  name='last_name'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='register_line'>
                <RegisterInput
                  type='text'
                  placeholder='Mobile number or email address'
                  name='email'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='register_line'>
                <RegisterInput
                  type='password'
                  placeholder='New password'
                  name='password'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='register_col'>
                <div className='register_line_header'>
                  Date of birth <i className='info_icon'></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className='register_col'>
                <div className='register_line_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <GenderSelect handleRegisterChange={handleRegisterChange} />
              </div>
              <div className='register_infos'>
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className='register_btn_wrapper'>
                <button className='blue_btn open_signup'>Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
