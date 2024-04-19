import React from "react";
import PropTypes from "prop-types";

const Input = ({
  id,
  placeholder,
  name,
  type,
  onChange,
  messError,
  className,
  readOnly = false,
  value,
  ...passProps
}) => {
  const props = {
    onChange,
    ...passProps,
  };
  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      <input
        id={id}
        readOnly={readOnly}
        className={`w-full py-2 dark:bg-transparent dark:text-textDark dark:border-defaultBorderDark border-b border-defaultBorder ${
          readOnly
            ? null
            : "focus:border-primaryColor dark:focus:border-primaryColor"
        } outline-none`}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        {...props}
      />
      {messError && (
        <span className="text-red-600 text-[0.9rem] animate__animated animate__fadeIn">
          {messError}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  messError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default Input;
