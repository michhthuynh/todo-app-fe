import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Task.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

Task.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  focus: PropTypes.string,
  onClickEdit: PropTypes.func,
  onClickRemove: PropTypes.func,
};

Task.defaultProps = {
  id: '',
  description: '',
  focus: '',
  onClickEdit: null,
  onClickRemove: null,
}


function Task(props) {
  const { id, description, onClickEdit, onClickRemove, focus } = props

  const handleOnClickEdit = () => {
    if (!onClickEdit) return
    onClickEdit(id)
  }

  const handleOnClickRemove = () => {
    if (!onClickRemove) return
    onClickRemove(id)
  }

  return (
    <div className={focus === id ? "task-item focus" : "task-item"}>
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
    </div>
  );
}

export default Task;