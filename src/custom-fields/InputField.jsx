import React from 'react';
import PropTypes from 'prop-types';

InputField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disable: false
}

function InputField(props) {
  const {
    field, form, placeholder,
    type, label, disable,
  } = props

  const { name } = field
  const { errors, touched } = form
  const showError = touched[name] && errors[name]
  return (
    <div className="form-group">
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
        <p className="form-group__error-message">
          {
            errors[name]
          }
        </p>
      }
    </div>
  );
}

export default InputField;