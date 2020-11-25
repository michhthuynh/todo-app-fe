import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import './Collection.scss'
import API from '../../utils/API';
import tokenConfig from '../../utils/tokenConfig';
import CollectionHeader from '../CollectionHeader';
import CollectionList from '../CollectionList';
import CollectionEdit from '../CollectionEdit';
import CollectionAddTask from '../CollectionAddTask';

Collection.propTypes = {
  title: PropTypes.string,
  collectionID: PropTypes.string,
  reload: PropTypes.string,
  tasks: PropTypes.array,
  onClickRemoveCollection: PropTypes.func,
  onChangeTitle: PropTypes.func,
};

Collection.defaultProps = {
  title: '',
  collectionID: '',
  reload: '',
  tasks: [],
  onClickRemoveCollection: null,
  onChangeTitle: null,
}

function Collection(props) {
  const { collectionID, onClickRemoveCollection, onChangeTitle, title, reload, tasks } = props

  const [showFormAddTask, setShowFormAddTask] = useState(false)
  const [showFormEdit, setShowFormEdit] = useState(false)

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

  }

  const handleOnClickAddTask = () => {
    setShowFormAddTask(true)
  }

  const handleDisplayAddTask = e => {
    console.log(e)
    setShowFormAddTask(e)
  }

  return (
    <div className="collection-wrapper">
      <div className="collection">
        <CollectionHeader title={title} collectionID={collectionID} onClickRemove={handleOnClickRemoveCollection} onChangeTitle={handleOnChangeTitle} />
        <CollectionList task={tasks} />
        <CollectionEdit display={showFormEdit} />
        <CollectionAddTask display={showFormAddTask} onSubmit={handleAddTask} onDisplay={handleDisplayAddTask} />
        {
          !(showFormAddTask || showFormEdit) &&
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