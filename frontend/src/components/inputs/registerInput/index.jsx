import { useField, ErrorMessage } from 'formik';
import { useMediaQuery } from 'react-responsive';

import './style.scss';

export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);

  const small = useMediaQuery({
    query: '(min-width: 539px)',
  });
  const large = useMediaQuery({
    query: '(min-width: 1170px)',
  });
  const largeFirstName = large && field.name === 'first_name';
  const largeLastName = large && field.name === 'last_name';
  return (
    <div className='input register_input'>
      <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        style={{
          width: `${
            small && (field.name === 'first_name' || field.name === 'last_name')
              ? '100%'
              : small && (field.name === 'email' || field.name === 'password')
              ? '370px'
              : '300px'
          }`,
        }}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div
          className={large ? 'input_error input_error_desktop' : 'input_error'}
          style={{
            transform: 'translateY(2px)',
            left: `${largeFirstName ? '-107%' : largeLastName ? '107%' : ''}`,
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                large && field.name !== 'last_name'
                  ? 'error_arrow_left'
                  : large && field.name === 'last_name'
                  ? 'error_arrow_right'
                  : !large && 'error_arrow_bottom'
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && <i className='error_icon'></i>}
    </div>
  );
}
