import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FastField, Formik } from 'formik';
import AutoFocusField from '../../custom-fields/AutoFocusField';

AddCollectionForm.propTypes = {
  showForm: PropTypes.bool,
  onSubmit: PropTypes.func,
};

AddCollectionForm.defaultProps = {
  showForm: false,
  onSubmit: null,
}
const randomID = () => {
  return Math.ceil(Math.random() * Math.pow(10, 8))
}

function AddCollectionForm(props) {
  const { showForm, onSubmit } = props

  const handleOnBlur = () => {

  }
  return (
    <div className="collection__add-collection_form-wrapper">
      <Formik
        initialValues={{ addCollectionField: '' }}
        onSubmit={(values, { resetForm }) => {
          if (!onSubmit) return
          onSubmit({
            id: randomID(),
            title: values.addCollectionField
          })

        }}
      >
        {
          formProps => {
            return (
              <form onSubmit={formProps.handleSubmit} onBlur={handleOnBlur}>
                <FastField
                  name='addCollectionField'
                  component={AutoFocusField}

                  className="addCollectionField"
                />
              </form>
            )
          }
        }
      </Formik>
    </div>
  );
}

export default AddCollectionForm;