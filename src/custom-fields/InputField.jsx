import React from 'react';
import PropTypes from 'prop-types';

InputField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
  className: PropTypes.string,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disable: false,
  className: ''
}

function InputField(props) {
  const {
    field, form, placeholder,
    type, label, disable,
    className
  } = props

  const { name } = field
  const { errors, touched } = form
  const showError = touched[name] && errors[name]
  return (
    <div className={`${className}__form-group`}>
      <input
        id={name}
        {...field}

        type={type}
        placeholder={placeholder}
        disabled={disable}
        required
      />
      {
        showError &&
        <p className={`${className}__form-group__error-message`}>
          {
            errors[name]
          }
        </p>
      }
    </div>
  );
}

export default InputField;