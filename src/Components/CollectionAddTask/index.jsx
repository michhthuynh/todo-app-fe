import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Formik } from 'formik';
import AutoFocusField from '../../custom-fields/AutoFocusField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

CollectionAddTask.propTypes = {
  display: PropTypes.bool,
  onSubmit: PropTypes.func,
  onDisplay: PropTypes.func,
};

CollectionAddTask.defaultProps = {
  display: false,
  onSubmit: null,
  onDisplay: null,
}

function CollectionAddTask(props) {
  const { onSubmit, onDisplay } = props

  const handleAddOnBlur = e => {
    onSubmit({
      description: e
    })
    onDisplay(false)
  }

  const handleCancelAdd = () => {
    onDisplay(false)
  }

  const { display } = props
  return (
    display &&
    <div className="collection__add-new">
      <Formik
        initialValues={{ addField: '' }}
        onSubmit={(values, { resetForm }) => {
          if (!onSubmit) return
          onSubmit({
            description: values.addField
          })
          onDisplay(false)
        }}
      >
        {
          formProps => {
            return (
              <form onSubmit={formProps.handleSubmit} onBlur={handleAddOnBlur}>
                <FastField
                  name='addField'
                  component={AutoFocusField}

                  className="addField"
                />
                <div className="collection__add-new__control">
                  <button type="submit" className="collection__add-new__control__submit">
                    Add task
                  </button>
                  <button onClick={handleCancelAdd} className="collection__add-new__control__cancel">
                    <span>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </button>
                </div>
              </form>
            )
          }
        }
      </Formik>
    </div>

  );
}

export default CollectionAddTask;