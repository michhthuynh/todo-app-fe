import React from 'react';
import PropTypes from 'prop-types';

AutoFocusField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
  className: PropTypes.string,
};

AutoFocusField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disable: false,
  className: ''
}

function AutoFocusField(props) {
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
        autoComplete="off"
        autoFocus
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

export default AutoFocusField;