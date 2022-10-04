import { useCallback, useRef, useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import PulseLoader from 'react-spinners/PulseLoader';

import useClickOutside from '../../hooks/useClickOutside';
import getCroppedImg from '../../helpers/getCroppedImg';
import { useUploadImageMutation } from '../../services/uploadApi';
import { useCreatePostMutation } from '../../services/postApi';
import { useUpdateCoverPictureMutation } from '../../services/userApi';
import { useSelector } from 'react-redux';

export default function Cover({ cover, visitor }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [error, setError] = useState('');
  const [coverPicture, setCoverPicture] = useState('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState();

  const menuRef = useRef(null);
  const refInput = useRef(null);
  const coverRef = useRef(null);

  const user = useSelector((state) => state.user);

  const [uploadImages, { isLoading: loadingImages }] = useUploadImageMutation();
  const [createPost, { isLoading: loadingPost }] = useCreatePostMutation();
  const [updateCoverPicture, { isLoading: loadingCover }] =
    useUpdateCoverPictureMutation();

  const isLoading = loadingImages || loadingPost || loadingCover;

  useClickOutside(menuRef, () => setShowCoverMenu(false));

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels, coverPicture]
  );

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError(`${file.name} format is not supported.`);
      setShowCoverMenu(false);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      setShowCoverMenu(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };

  const handleBackgroundPicture = async () => {
    let img = await getCroppedImage();
    let blob = await fetch(img).then((b) => b.blob());
    const path = `${user.username}/cover_pictures`;
    let formData = new FormData();
    formData.append('file', blob);
    formData.append('path', path);

    const { data: dataImages, error: errorImages } = await uploadImages(
      formData
    );
    if (errorImages) {
      return setError(errorImages.data.message);
    }

    const { error: errorCover } = await updateCoverPicture({
      url: dataImages[0].url,
    });
    if (errorCover) {
      return setError(errorCover.data.message);
    }

    const { error: errorPost } = await createPost({
      type: 'cover',
      background: null,
      images: dataImages,
      user: user.id,
    });
    if (errorPost) {
      return setError(errorPost.data.message);
    }

    setCoverPicture('');
    setShowCoverMenu(false);
  };

  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, []);

  return (
    <div className='profile_cover' ref={coverRef}>
      {coverPicture && (
        <div className='save_changes_cover'>
          <div className='save_changes_left'>
            <i className='public_icon'></i>
            Your cover photo is public
          </div>
          <div className='save_changes_right'>
            <button
              className='blue_btn opacity_btn'
              onClick={() => setCoverPicture('')}
            >
              Cancel
            </button>
            <button className='blue_btn ' onClick={handleBackgroundPicture}>
              {isLoading ? (
                <PulseLoader color='#fff' size={5} />
              ) : (
                'Save changes'
              )}
            </button>
          </div>
        </div>
      )}
      <input
        type='file'
        ref={refInput}
        hidden
        accept='image/jpeg,image/png,image/webp,image/gif'
        onChange={handleImage}
      />
      {error && (
        <div className='postError comment_error cover_error'>
          <div className='postError_error'>{error}</div>
          <button className='blue_btn' onClick={() => setError('')}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className='cover_crooper'>
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit='horizontal-cover'
          />
        </div>
      )}
      {cover && !coverPicture && <img src={cover} className='cover' alt='' />}
      {!visitor && (
        <div className='update_cover_wrapper'>
          <div
            className='open_cover_update'
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className='camera_filled_icon'></i>
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className='open_cover_menu' ref={menuRef}>
              <div className='open_cover_menu_item hover1'>
                <i className='photo_icon'></i>
                Select Photo
              </div>
              <div
                className='open_cover_menu_item hover1'
                onClick={() => refInput.current.click()}
              >
                <i className='upload_icon'></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
