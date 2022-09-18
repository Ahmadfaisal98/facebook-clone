import { useMediaQuery } from 'react-responsive';

export default function GenderSelect({
  handleRegisterChange,
  name,
  genderError,
}) {
  const large = useMediaQuery({
    query: '(min-width: 1170px)',
  });
  return (
    <div
      key={name}
      className='register_grid'
      style={{
        marginBottom: `${genderError && !large ? '70px' : '0'}`,
      }}
    >
      <label htmlFor='male'>
        Male
        <input
          type='radio'
          name='gender'
          id='male'
          value='male'
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor='female'>
        Female
        <input
          type='radio'
          name='gender'
          id='female'
          value='female'
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor='custom'>
        Custom
        <input
          type='radio'
          name='gender'
          id='custom'
          value='custom'
          onChange={handleRegisterChange}
        />
      </label>
      {genderError && (
        <div
          className={
            !large ? 'input_error' : 'input_error input_error_select_large'
          }
        >
          <div
            className={!large ? 'error_arrow_bottom' : 'error_arrow_left'}
          ></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
