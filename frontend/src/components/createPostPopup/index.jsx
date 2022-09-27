import { useRef, useState } from 'react';

import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
import AddToYourPost from './AddToYourPost';
import ImagePreview from './ImagePreview';
import useClickOutside from '../../hooks/useClickOutside';
import { useCreateMutation } from '../../services/postApi';
import PulseLoader from 'react-spinners/PulseLoader';
import './style.scss';
import PostError from './PostError';
import dataURItoBlob from '../../helpers/dataURItoBlob';
import { useUploadImageMutation } from '../../services/uploadApi';

export default function CreatePostPopup({ user, setVisible }) {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState('');
  const popup = useRef(null);
  const [postCreate, { isLoading, isError, error }] = useCreateMutation();
  const [
    uploadImage,
    { isLoading: isLoadingUpload, isError: isErrorUpload, error: errorUpload },
  ] = useUploadImageMutation();

  useClickOutside(popup, () => setVisible(false));

  const handleSubmit = async () => {
    let resUpload = [];
    let isUploadSuccess = true;
    if (images.length) {
      isUploadSuccess = false;
      const path = `${user.username}/post-images`;
      let formData = new FormData();
      formData.append('path', path);
      const postImages = images.map((img) => dataURItoBlob(img));
      console.log(postImages);
      postImages.forEach((image) => {
        formData.append('file', image);
      });
      const { data: dataUpload } = await uploadImage(formData);
      setImages([]);
      if (dataUpload) {
        resUpload = dataUpload;
        isUploadSuccess = true;
      }
    }

    const { data: dataPost } = await postCreate({
      type: null,
      background,
      images: resUpload,
      text,
      user: user.id,
    });

    if (dataPost && isUploadSuccess) {
      setBackground('');
      setText('');
      setVisible(false);
    }
  };

  return (
    <div className='blur'>
      <div className='postBox' ref={popup}>
        {isError && isErrorUpload && (
          <PostError
            error={error?.data?.message || errorUpload?.data?.message}
            handleSubmit={handleSubmit}
          />
        )}
        <div className='box_header'>
          <div className='small_circle' onClick={() => setVisible(false)}>
            <i className='exit_icon'></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className='box_profile'>
          <img src={user.picture} alt='' className='box_profile_img' />
          <div className='box_col'>
            <div className='box_profile_name'>
              {user.first_name} {user.last_name}
            </div>
            <div className='box_privacy'>
              <img src='../../../icons/public.png' alt='' />
              <span>Public</span>
              <i className='arrowDown_icon'></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <EmojiPickerBackgrounds
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            setBackground={setBackground}
            background={background}
          />
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className='post_submit'
          onClick={handleSubmit}
          disabled={isLoading || isLoadingUpload}
        >
          {isLoading || isLoadingUpload ? (
            <PulseLoader color='#fff' size={5} />
          ) : (
            'Post'
          )}
        </button>
      </div>
    </div>
  );
}
