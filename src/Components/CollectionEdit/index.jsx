import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Formik } from 'formik';
import AutoFocusField from '../../custom-fields/AutoFocusField';

CollectionEdit.propTypes = {
  display: PropTypes.bool
};

CollectionEdit.defaultProps = {
  display: false
}

function CollectionEdit(props) {
  const { display } = props
  const handleEditOnBlur = () => {
  }

  return (
    display &&
    <div className="collection__edit">
      <Formik
        initialValues={{ editField: '' }}
        onSubmit={(values, { resetForm }) => {
        }}
      >
        {
          formProps => {
            return (
              <form onSubmit={formProps.handleSubmit} onBlur={handleEditOnBlur}>
                <FastField
                  name='editField'
                  component={AutoFocusField}

                  className="editField"
                />
              </form>
            )
          }
        }
      </Formik>
    </div>
  );
}

export default CollectionEdit;