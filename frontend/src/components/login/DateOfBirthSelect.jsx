export default function DateOfBirthSelect({
  bDay,
  days,
  bMonth,
  months,
  bYear,
  years,
  handleRegisterChange,
}) {
  const toMonthName = (month) => {
    const date = new Date(bYear, month, 0);
    return date.toLocaleString('default', { month: 'short' });
  };

  return (
    <div className='register_grid'>
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
    </div>
  );
}
