import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Input = React.forwardRef(({ label, error, type, className, ...rest }, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={clsx(
          'w-full px-4 py-2 border rounded focus:outline-none focus:ring',
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100',
          className
        )}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string
};

Input.defaultProps = {
  label: '',
  error: '',
  type: 'text',
  className: ''
};

export default Input;
