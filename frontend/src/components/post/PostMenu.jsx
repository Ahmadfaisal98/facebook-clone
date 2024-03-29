import { useRef } from 'react';
import { saveAs } from 'file-saver';

import MenuItem from './MenuItem';
import useClickOutside from '../../hooks/useClickOutside';
import {
  useProfileUserQuery,
  useSavePostMutation,
} from '../../services/userApi';
import { useDeletePostMutation } from '../../services/postApi';

export default function PostMenu({
  postUserId,
  userId,
  setShowMenu,
  postId,
  user,
  images,
}) {
  const menu = useRef(null);
  const isMyPost = postUserId === userId;

  const [savePost] = useSavePostMutation();
  const { data: dataPost } = useProfileUserQuery(user.username);
  const [deletePost] = useDeletePostMutation();

  const isSaved = dataPost?.savedPosts.find((v) => v.post === postId);

  useClickOutside(menu, () => setShowMenu(false));

  const downloadImages = async () => {
    images.forEach((img) => {
      saveAs(img.url, 'image.jpg');
    });
  };

  return (
    <ul className='post_menu' ref={menu}>
      {isMyPost && <MenuItem icon='pin_icon' title='Pin Post' />}
      {isSaved ? (
        <MenuItem
          icon='save_icon'
          title='Unsave Post'
          subtitle='Remove this from your saved items.'
          onClick={() => savePost(postId)}
        />
      ) : (
        <MenuItem
          icon='save_icon'
          title='Save Post'
          subtitle='Add this to your saved items.'
          onClick={() => savePost(postId)}
        />
      )}
      <div className='line'></div>
      {isMyPost && <MenuItem icon='edit_icon' title='Edit Post' />}
      {!isMyPost && (
        <MenuItem
          icon='turnOnNotification_icon'
          title='Turn on notifications for this post'
        />
      )}
      {images?.length > 0 && (
        <MenuItem
          icon='download_icon'
          title={`Download Image${images?.length > 1 ? 's' : ''}`}
          onClick={downloadImages}
        />
      )}
      {images?.length > 0 && (
        <MenuItem icon='fullscreen_icon' title='Enter Fullscreen' />
      )}
      {isMyPost && (
        <MenuItem img='../../../icons/lock.png' title='Edit audience' />
      )}
      {isMyPost && (
        <MenuItem
          icon='turnOffNotifications_icon'
          title='Turn off notifications for this post'
        />
      )}
      {isMyPost && (
        <MenuItem icon='delete_icon' title='Turn off translations' />
      )}
      {isMyPost && <MenuItem icon='date_icon' title='Edit Date' />}
      {isMyPost && (
        <MenuItem icon='refresh_icon' title='Refresh share attachment' />
      )}
      {isMyPost && <MenuItem icon='archive_icon' title='Move to archive' />}
      {isMyPost && (
        <MenuItem
          icon='trash_icon'
          title='Move to trash'
          subtitle='items in your trash are deleted after 30 days'
          onClick={() => deletePost(postId)}
        />
      )}
      {!isMyPost && <div className='line'></div>}
      {!isMyPost && (
        <MenuItem
          img='../../../icons/report.png'
          title='Report post'
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
}
