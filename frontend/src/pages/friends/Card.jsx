import { Link } from 'react-router-dom';
import {
  useAcceptRequestFriendMutation,
  useCancelRequestFriendMutation,
  useDeleteRequestFriendMutation,
} from '../../services/userApi';

export default function Card({ user, type }) {
  const [cancelRequest] = useCancelRequestFriendMutation();
  const [acceptRequest] = useAcceptRequestFriendMutation();
  const [deleteRequest] = useDeleteRequestFriendMutation();

  return (
    <div className='req_card'>
      <Link to={`/profile/${user.username}`}>
        <img src={user.picture} alt='' />
      </Link>
      <div className='req_name'>
        {user.first_name} {user.last_name}
      </div>
      {type === 'sent' ? (
        <button className='blue_btn' onClick={() => cancelRequest(user._id)}>
          Cancel Request
        </button>
      ) : type === 'request' ? (
        <>
          <button className='blue_btn' onClick={() => acceptRequest(user._id)}>
            Confirm
          </button>
          <button className='gray_btn' onClick={() => deleteRequest(user._id)}>
            Delete
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
