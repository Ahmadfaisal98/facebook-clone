import { HashLoader } from 'react-spinners';

export default function LoadProfileLeft() {
  return (
    <>
      <div className='profile_card'>
        <div className='profile_card_header'>Intro</div>
        <div className='sekelton_loader'>
          <HashLoader color='#1876f2' />
        </div>
      </div>
      <div className='profile_card'>
        <div className='profile_card_header'>
          Photos
          <div className='profile_header_link'>See all photos</div>
        </div>
        <div className='sekelton_loader'>
          <HashLoader color='#1876f2' />
        </div>
      </div>
      <div className='profile_card'>
        <div className='profile_card_header'>
          Friends
          <div className='profile_header_link'>See all friends</div>
        </div>
        <div className='sekelton_loader'>
          <HashLoader color='#1876f2' />
        </div>
      </div>
    </>
  );
}
