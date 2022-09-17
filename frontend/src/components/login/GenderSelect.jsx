export default function GenderSelect({ handleRegisterChange, genderError }) {
  return (
    <div className='register_grid'>
      <label htmlFor='male'>
        <span>Male</span>
        <input
          type='radio'
          name='gender'
          id='male'
          value='male'
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor='female'>
        <span>Female</span>
        <input
          type='radio'
          name='gender'
          id='female'
          value='female'
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor='custom'>
        <span>Custom</span>
        <input
          type='radio'
          name='gender'
          id='custom'
          value='custom'
          onChange={handleRegisterChange}
        />
      </label>
    </div>
  );
}
