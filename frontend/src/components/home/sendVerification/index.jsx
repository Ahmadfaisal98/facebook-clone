import { useSendVerificationMutation } from '../../../services/serverApi';
import './style.scss';

export default function SendVerification({ user }) {
  const [postVerification, { error, isError, data, isSuccess }] =
    useSendVerificationMutation();

  return (
    <div className='send_verification'>
      <span>
        Your account is not verified,verify your account before it gets deleted
        after a month from creating.
      </span>
      <div className='button' onClick={postVerification}>
        click here to resend verification link
      </div>
      {isSuccess && <div className='success_text'>{data.message}</div>}
      {isError && <div className='error_text'>{error.data.message}</div>}
    </div>
  );
}
