import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import LoginInput from '../../components/inputs/loginInput';
import { useValidateResetCodeMutation } from '../../services/serverApi';

export default function CodeVerification({
  code,
  setCode,
  userInfos,
  setVisible,
}) {
  const [validateResetCode, { error, isError, isLoading }] =
    useValidateResetCodeMutation();

  const validateCode = Yup.object({
    code: Yup.string()
      .required('Code is required')
      .min('5', 'Code must be 5 characters.')
      .max('5', 'Code must be 5 characters.'),
  });

  const handleSubmit = async () => {
    const { data } = await validateResetCode({ email: userInfos.email, code });
    if (data.status === 200) {
      setVisible(3);
    }
  };

  return (
    <div className='reset_form'>
      <div className='reset_form_header'>Code verification</div>
      <div className='reset_form_text'>
        Please enter code that been sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        validationSchema={validateCode}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='text'
              name='code'
              onChange={(e) => setCode(e.target.value)}
              placeholder='Code'
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
