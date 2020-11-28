import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Task.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import AutoFocusField from '../../custom-fields/AutoFocusField';
import { FastField, Formik } from 'formik';

Task.propTypes = {
  taskID: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClickRemove: PropTypes.func,
  onCheckBox: PropTypes.func,
};

Task.defaultProps = {
  taskID: '',
  description: '',
  status: false,
  onSubmit: null,
  onClickRemove: null,
  onCheckBox: null,
}


function Task(props) {
  const { taskID, description, onSubmit, onClickRemove, status, onCheckBox } = props
  const [showFormEdit, setShowFormEdit] = useState(false)

  const handleOnClickEdit = () => {
    setShowFormEdit(true)
  }

  const handleOnClickRemove = () => {
    if (!onClickRemove) return
    onClickRemove(taskID)
  }

  const handleOnBlur = () => {
    setShowFormEdit(false)
  }

  const handleOnCheckBox = e => {
    if (!onCheckBox) return
    onCheckBox({
      taskID: taskID,
      status: e.target.checked,
    })
  }

  return (
    <div className={status ? "task-item isComplete" : "task-item"}>
      <input type="checkbox" onChange={handleOnCheckBox} checked={status} className="task-item__checkbox" id={taskID} />
      <label className="task-item__checkbox__done" htmlFor={taskID}></label>
      <label className="task-item__checkbox__none" htmlFor={taskID}></label>
      <div className="task-item__title">
        {description}
      </div>
      <div className="task-item__action">
        <button className="task-item__action__btn" onClick={handleOnClickEdit}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className="task-item__action__btn" onClick={handleOnClickRemove}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {
        !!showFormEdit &&
        <div className="task-item__form">
          <Formik
            initialValues={{ editTitle: '' }}
            onSubmit={(values, { resetForm }) => {
              onSubmit({
                taskID: taskID,
                description: values.editTitle
              })
              setShowFormEdit(false)
            }}
          >
            {
              formProps => {
                return (
                  <form onSubmit={formProps.handleSubmit} onBlur={handleOnBlur}>
                    <FastField
                      name='editTitle'
                      component={AutoFocusField}

                      className="editTitle"
                    />
                  </form>
                )
              }
            }
          </Formik>
        </div>
      }
    </div>
  );
}

export default Task;