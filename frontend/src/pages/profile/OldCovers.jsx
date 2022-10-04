import { useRef } from 'react';
import { useSelector } from 'react-redux';

import useClickOutside from '../../hooks/useClickOutside';

export default function OldCovers({ photos, setCoverPicture, setShow }) {
  const user = useSelector((state) => state.user);
  const Ref = useRef(null);

  useClickOutside(Ref, () => setShow(false));

  return (
    <div className='blur'>
      <div className='postBox selectCoverBox' ref={Ref}>
        <div className='box_header'>
          <div
            className='small_circle'
            onClick={() => {
              setShow(false);
            }}
          >
            <i className='exit_icon'></i>
          </div>
          <span>Select photo</span>
        </div>
        <div className='selectCoverBox_links'>
          <div className='selectCoverBox_link'>Recent Photos</div>
          <div className='selectCoverBox_link'>Photo Albums</div>
        </div>
        <div className='old_pictures_wrap scrollbar'>
          <h4>your cover picture</h4>
          <div className='old_pictures'>
            {photos
              ?.filter(
                (img) => img.folder === `${user.username}/cover_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=''
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShow(false);
                  }}
                />
              ))}
          </div>
          <h4>other pictures</h4>
          <div className='old_pictures'>
            {photos
              ?.filter((img) => img.folder !== `${user.username}/post_images`)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=''
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShow(false);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
