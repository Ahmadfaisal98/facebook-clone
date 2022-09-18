import { useMediaQuery } from 'react-responsive';

export default function DateOfBirthSelect({
  bDay,
  days,
  bMonth,
  months,
  bYear,
  years,
  handleRegisterChange,
  dateError,
}) {
  const toMonthName = (month) => {
    const date = new Date(bYear, month, 0);
    return date.toLocaleString('default', { month: 'short' });
  };

  const large = useMediaQuery({
    query: '(min-width: 1170px)',
  });

  return (
    <div
      className='register_grid'
      style={{
        marginBottom: `${dateError && !large ? '90px' : '0'}`,
      }}
    >
      <select name='bDay' value={bDay} onChange={handleRegisterChange}>
        {days.map(({ day, key }) => (
          <option value={day} key={key}>
            {day}
          </option>
        ))}
      </select>
      <select name='bMonth' value={bMonth} onChange={handleRegisterChange}>
        {months.map(({ month, key }) => (
          <option value={month} key={key}>
            {toMonthName(month)}
          </option>
        ))}
      </select>
      <select name='bYear' value={bYear} onChange={handleRegisterChange}>
        {years.map(({ year, key }) => (
          <option value={year} key={key}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            !large ? 'input_error' : 'input_error input_error_select_large'
          }
        >
          <div
            className={!large ? 'error_arrow_bottom' : 'error_arrow_left'}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
}
