import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import './Collection.scss'

import CollectionHeader from '../CollectionHeader';
import CollectionList from '../CollectionList';
import CollectionAddTask from '../CollectionAddTask';

Collection.propTypes = {
  title: PropTypes.string,
  collectionID: PropTypes.string,
  tasks: PropTypes.array,
  onClickRemoveCollection: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onAddTask: PropTypes.func,
  onChangeDesc: PropTypes.func,
  onRemoveTask: PropTypes.func,
  onChecked: PropTypes.func,
};

Collection.defaultProps = {
  title: '',
  collectionID: '',
  tasks: [],
  onClickRemoveCollection: null,
  onChangeTitle: null,
  onAddTask: null,
  onChangeDesc: null,
  onRemoveTask: null,
  onChecked: null,
}

function Collection(props) {
  const { collectionID, onClickRemoveCollection, onChangeTitle, title, tasks, onAddTask, onChangeDesc, onRemoveTask, onChecked } = props
  const [showFormAddTask, setShowFormAddTask] = useState(false)


  // handle header
  const handleOnClickRemoveCollection = e => {
    if (!onClickRemoveCollection) return
    onClickRemoveCollection(e)
  }

  const handleOnChangeTitle = e => {
    if (!onChangeTitle) return
    onChangeTitle(e)
  }

  const handleAddTask = e => {
    if (!onAddTask) return
    onAddTask({
      description: e,
      collectionID: collectionID
    })
  }

  const handleOnClickAddTask = () => {
    setShowFormAddTask(true)
  }

  const handleDisplayAddTask = e => {
    setShowFormAddTask(e)
  }

  const handleChangeDesc = e => {
    if (!onChangeDesc) return
    onChangeDesc(e)
  }

  const handleRemoveTask = e => {
    if (!onRemoveTask) return
    onRemoveTask(e)
  }

  const handleOnChecked = e => {
    if (!onChecked) return
    onChecked(e)
  }

  return (
    <div className="collection-wrapper">
      <div className="collection">
        <CollectionHeader title={title} collectionID={collectionID} onClickRemove={handleOnClickRemoveCollection} onChangeTitle={handleOnChangeTitle} />
        <CollectionList task={tasks} onSubmit={handleChangeDesc} onRemoveTask={handleRemoveTask} onChecked={handleOnChecked} />
        <CollectionAddTask display={showFormAddTask} onSubmit={handleAddTask} onDisplay={handleDisplayAddTask} han />
        {
          !showFormAddTask &&
          <div className="collection__footer">
            <button className="collection__footer__btn" onClick={handleOnClickAddTask}>
              <span className="collection__footer__btn__icon"><FontAwesomeIcon icon={faPlus} /></span>
              <span className="collection__footer__btn__card">Add new task</span>
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default Collection;