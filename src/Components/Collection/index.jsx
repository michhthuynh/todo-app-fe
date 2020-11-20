import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Task from '../Task';
import './Collection.scss'

function Collection(props) {

  const handleOnClickAddTask = () => {
    console.log("add")
  }

  const handleOnClickRemoveTask = () => {
    console.log("remove")
  }
  return (
    <div className="collection">
      <div className="collection__header">
        <div className="collection__header__title">
          huynh hoang
        </div>
        <button className="collection__header__btn">
          <FontAwesomeIcon icon={faEllipsisH} />
        </button>
      </div>
      <div className="collection__list">
        <Task title="thanks" onClickAdd={handleOnClickAddTask} onClickRemove={handleOnClickRemoveTask} />
        <Task title="thanks" onClickAdd={handleOnClickAddTask} onClickRemove={handleOnClickRemoveTask} />
        <Task title="thanks" onClickAdd={handleOnClickAddTask} onClickRemove={handleOnClickRemoveTask} />
      </div>
      <div className="collection__footer">
        <button className="collection__footer__btn">
          <span className="collection__footer__btn__icon"><FontAwesomeIcon icon={faPlus} /></span>
          <span className="collection__footer__btn__card">Add new task</span>
        </button>
      </div>
    </div>
  );
}

export default Collection;