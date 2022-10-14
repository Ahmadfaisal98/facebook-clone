import Skeleton from 'react-loading-skeleton';

export default function LoadProfileContainer({ visitor }) {
  return (
    <>
      <div className='profile_cover'>
        <Skeleton
          height='347px'
          containerClassName='avatar-skeleton'
          style={{ borderRadius: '8px' }}
        />
      </div>
      <div
        className='profile_img_wrap'
        style={{
          marginBottom: '-3rem',
          transform: 'translateY(-8px)',
        }}
      >
        <div className='profile_w_left'>
          <Skeleton
            circle
            height='180px'
            width='180px'
            containerClassName='avatar-skeleton'
            style={{ transform: 'translateY(-3.3rem)' }}
          />
          <div className='profile_w_col'>
            <div className='profile_name'>
              <Skeleton
                height='35px'
                width='200px'
                containerClassName='avatar-skeleton'
              />
              <Skeleton
                height='30px'
                width='100px'
                containerClassName='avatar-skeleton'
                style={{ transform: 'translateY(2.5px)' }}
              />
            </div>
            <div className='profile_friend_count'>
              <Skeleton
                height='20px'
                width='90px'
                containerClassName='avatar-skeleton'
                style={{ marginTop: '5px' }}
              />
            </div>
            <div className='profile_friend_imgs'>
              {Array(6)
                .fill('')
                .map((id, i) => (
                  <Skeleton
                    key={i}
                    circle
                    height='32px'
                    width='32px'
                    containerClassName='avatar-skeleton'
                    style={{ transform: `translateX(${-i * 7}px)` }}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className={`friendship ${!visitor && 'row'}`}>
          <Skeleton
            height='36px'
            width={120}
            containerClassName='avatar-skeleton'
          />
          <div className='flex'>
            <Skeleton
              height='36px'
              width={120}
              containerClassName='avatar-skeleton'
            />
            {visitor && (
              <Skeleton
                height='36px'
                width={120}
                containerClassName='avatar-skeleton'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
