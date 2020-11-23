import React from 'react';
import PropTypes from 'prop-types';
import './Task.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

Task.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

Task.defaultProps = {
  id: '',
  description: '',
  onClickAdd: null,
  onClickRemove: null,
}

function Task(props) {
  const { id, description, onClickAdd, onClickRemove } = props

  const handleOnClickAdd = () => {
    if (!onClickAdd) return
    onClickAdd(id)
  }

  const handleOnClickRemove = () => {
    if (!onClickRemove) return
    onClickRemove(id)
  }

  return (
    <div className="task-item">
      <div className="task-item__title">
        {description}
      </div>
      <div className="task-item__action">
        <button className="task-item__action__btn" onClick={handleOnClickAdd}>
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