import { useState } from 'react';
import { useUpdateDetailsUserMutation } from '../../services/userApi';

import Bio from './Bio';
import EditDetails from './EditDetails';
import './style.scss';

export default function Intro({ details, visitor }) {
  const initial = {
    bio: details?.bio || 'Welcome to my profile',
    otherName: details?.otherName || '',
    job: details?.job || '',
    workplace: details?.workplace || 'Google',
    highSchool: details?.highSchool || 'some high school',
    college: details?.college || 'some college',
    currentCity: details?.currentCity || 'Padang',
    hometown: details?.hometown || 'Sumatera Barat',
    relationship: details?.relationship || 'Single',
    instagram: details?.instagram || 'ahmad.faisal98',
  };

  const [infos, setInfos] = useState(initial);
  const [visible, setVisible] = useState(true);
  const [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);
  const [updateDetailsUser] = useUpdateDetailsUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - value.length);
  };

  const updateDetails = async () => {
    const { data } = await updateDetailsUser({ infos });
    if (data) {
      setShowBio(false);
    }
  };

  console.log(infos);
  return (
    <div className='profile_card'>
      <div className='profile_card_header'>Intro</div>
      {details?.bio && !showBio && (
        <div className='info_col'>
          <span className='info_text'>{infos.bio}</span>
          {!visitor && (
            <button
              className='gray_btn hover1'
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showBio && !visitor && (
        <button
          className='gray_btn hover1 w100'
          onClick={() => setShowBio(true)}
        >
          Add Bio
        </button>
      )}
      {showBio && (
        <Bio
          infos={infos}
          max={max}
          handleChange={handleChange}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
          placeholder='Add Bio'
          name='bio'
        />
      )}
      {infos.job && infos.workplace ? (
        <div className='info_profile'>
          <img src='../../../icons/job.png' alt='' />
          Works as {infos.job} at <b>{infos.workplace}</b>
        </div>
      ) : infos.job && !infos.workplace ? (
        <div className='info_profile'>
          <img src='../../../icons/job.png' alt='' />
          Works as {infos.job}
        </div>
      ) : (
        infos.workplace &&
        !infos.job && (
          <div className='info_profile'>
            <img src='../../../icons/job.png' alt='' />
            Works at {infos.workplace}
          </div>
        )
      )}
      {infos?.relationship && (
        <div className='info_profile'>
          <img src='../../../icons/relationship.png' alt='' />
          {infos.relationship}
        </div>
      )}
      {infos?.college && (
        <div className='info_profile'>
          <img src='../../../icons/studies.png' alt='' />
          Studied at {infos.college}
        </div>
      )}
      {infos?.highSchool && (
        <div className='info_profile'>
          <img src='../../../icons/studies.png' alt='' />
          Studied at {infos.highSchool}
        </div>
      )}
      {infos?.currentCity && (
        <div className='info_profile'>
          <img src='../../../icons/home.png' alt='' />
          Lives in {infos.currentCity}
        </div>
      )}
      {infos?.hometown && (
        <div className='info_profile'>
          <img src='../../../icons/home.png' alt='' />
          From {infos.hometown}
        </div>
      )}
      {infos?.hometown && (
        <div className='info_profile'>
          <img src='../../../icons/instagram.png' alt='' />
          <a
            href={`https://www.instagram.com/${infos.instagram}`}
            target='_blank'
            rel='noreferrer'
          >
            {infos.instagram}
          </a>
        </div>
      )}
      {!visitor && (
        <button
          className='gray_btn hover1 w100'
          onClick={() => setVisible(true)}
        >
          Edit Details
        </button>
      )}
      {!visitor && (
        <button className='gray_btn hover1 w100'>Add Hobbies</button>
      )}
      {!visitor && (
        <button className='gray_btn hover1 w100'>Add Featured</button>
      )}
      {visible && !visitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )}
    </div>
  );
}
