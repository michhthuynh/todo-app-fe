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
  onClickRemoveCollection: PropTypes.func,
  onReload: PropTypes.func,
};

Collection.defaultProps = {
  title: '',
  collectionID: '',
  reload: '',
  onClickRemoveCollection: null,
  onReload: null,
}

function Collection(props) {
  const { collectionID, onClickRemoveCollection, onReload, title, reload } = props
  const [showFormAdd, setShowFormAdd] = useState(false)
  const [showFormEdit, setShowFormEdit] = useState(false)
  const [task, setTask] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    const callGetTask = async () => {
      const res = await API.get(`/collection/get-task?id=${collectionID}`, tokenConfig)
      if (res.status) {
        console.log(res.data)
        setTask(res.data)
      }
    }
    callGetTask()
  }, [reload])

  useEffect(() => {
    const temp = newTitle.title
    if (newTitle === '') return
    if (temp === undefined) return
    const callUpdateCol = async () => {
      const res = await API.put(`/collection/${collectionID}/title`, { title: temp }, tokenConfig)
      if (res.status === 200) {
        onReload(newTitle)
      }
    }
    callUpdateCol()
  }, [newTitle])

  useEffect(() => {
    const temp = newTask.description
    if (newTask === '') return
    if (temp === undefined) return
    const callAddNewTask = async () => {
      const res = await API.post(`/task/create`, {
        collection_id: collectionID,
        description: temp
      }, tokenConfig)
      if (res.status === 200) {
        onReload(newTask)
      }
    }
    callAddNewTask()
  }, [newTask])

  const handleOnChangeTitle = e => {
    setNewTitle(e)
  }

  const handleAddTask = e => {
    console.log(e)
    setNewTask(e)
  }

  const handleOnClickAddTask = () => {
    setShowFormAdd(true)
  }

  const handleOnClickRemoveCollection = e => {
    if (!onClickRemoveCollection) return
    onClickRemoveCollection(e)
  }

  return (
    <div className="collection-wrapper">
      <div className="collection">
        <CollectionHeader title={title} collectionID={collectionID} onClickRemove={handleOnClickRemoveCollection} onChangeTitle={handleOnChangeTitle} />
        <CollectionList task={task} />
        <CollectionEdit display={showFormEdit} />
        <CollectionAddTask display={showFormAdd} onSubmit={handleAddTask} />
        {
          !(showFormAdd || showFormEdit) &&
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