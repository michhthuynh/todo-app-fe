import React from 'react';
import PropTypes from 'prop-types';
import './Task.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

Task.propTypes = {
  title: PropTypes.string.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

Task.defaultProps = {
  title: '',
  onClickAdd: null,
  onClickRemove: null,
}

function Task(props) {
  const { title, onClickAdd, onClickRemove } = props

  const handleOnClickAdd = () => {
    if (!onClickAdd) return
    onClickAdd()
  }

  const handleOnClickRemove = () => {
    if (!onClickRemove) return
    onClickRemove()
  }

  return (
    <div className="task-item">
      <div className="task-item__title">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eum sint corrupti quisquam. Ipsum molestiae harum accusamus suscipit sint vel nam, incidunt iste non tempora dolor praesentium, recusandae quo voluptate.
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