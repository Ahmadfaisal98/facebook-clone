import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import * as Yup from 'yup';

import RegisterInput from '../inputs/registerInput';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';

export default function RegisterForm() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  });
  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [height, setHeight] = useState(null);
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

  useEffect(() => {
    function handleResize() {
      const value = document.getElementById('login')?.offsetHeight;
      setHeight(value);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    bYear: Yup.string().test(`date`, `Validation failure message`, () => {
      const current_date = new Date();
      const picked_date = new Date(bYear, bMonth - 1, bDay);
      const maxYear = new Date(
        current_date.getFullYear() - 14,
        current_date.getMonth(),
        current_date.getDate()
      );
      const minYear = new Date(
        current_date.getFullYear() - 70,
        current_date.getMonth(),
        current_date.getDate()
      );

      if (picked_date > maxYear) {
        setDateError(
          'It looks like you have entered the wrong info. Please make sure that you use your real date of birth.'
        );
      } else if (picked_date < minYear) {
        setDateError(
          'It looks like you have entered the wrong info. Please make sure that you use your real date of birth.'
        );
      } else {
        setDateError('');
      }
    }),
    gender: Yup.string().test(`gender`, `Validation failure message`, () => {
      if (gender === '') {
        setGenderError(
          'Please choose a gender. You can change who can see this later.'
        );
      } else {
        setGenderError('');
      }
    }),
  });

  console.log(height);

  return (
    <div className='blur'>
      <div className='register' id='register'>
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
          // onSubmit={handleSubmit}
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
                  dateError={dateError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className='register_col'>
                <div className='register_line_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className='register_infos'>
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className='register_btn_wrapper'>
                <button className='blue_btn open_signup' type='submit'>
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
