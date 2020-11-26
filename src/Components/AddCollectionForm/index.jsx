import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FastField, Formik } from 'formik';
import AutoFocusField from '../../custom-fields/AutoFocusField';

AddCollectionForm.propTypes = {
  onSubmit: PropTypes.func,
};

AddCollectionForm.defaultProps = {
  onSubmit: null,
}

function AddCollectionForm(props) {
  const { onSubmit } = props

  const handleOnBlur = () => {

  }
  return (
    <Formik
      initialValues={{ addCollectionField: '' }}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return
        onSubmit(values.addCollectionField)
        resetForm({
          addCollectionField: ""
        })
      }}
    >
      {
        formProps => {
          return (
            <form onSubmit={formProps.handleSubmit} onBlur={handleOnBlur} className="collection__add-collection__control__form">
              <FastField
                name='addCollectionField'
                component={AutoFocusField}

                className="addCollectionField"
                placeholder="New task"
              />
              <button type="submit">Add collection</button>
            </form>
          )
        }
      }
    </Formik>

  );
}

export default AddCollectionForm;