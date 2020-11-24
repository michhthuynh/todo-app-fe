import PropTypes from 'prop-types';
import { faEllipsisH, faPen, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Task from '../Task';
import './Collection.scss'
import API from '../../utils/API';
import tokenConfig from '../../utils/tokenConfig';
import { FastField, Formik } from 'formik';
import AutoFocusField from '../../custom-fields/AutoFocusField';
import CollectionHeader from '../CollectionHeader';

Collection.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  onClickRemoveCollection: PropTypes.func,
};

Collection.defaultProps = {
  title: '',
  id: '',
  onClickRemoveCollection: null,
}

const parserData = data => {
  return data.map(value => {
    return {
      description: value['description'],
      id: value['_id']
    }
  })
}

function Collection(props) {
  const { title, id, onClickRemoveCollection } = props
  const [removeID, setRemoveID] = useState('')
  const [editID, setEditID] = useState('')
  const [inputAdd, setInputAdd] = useState('')
  const [inputEdit, setInputEdit] = useState('')
  const [focus, setFocus] = useState('')
  const [showFormAdd, setShowFormAdd] = useState(false)
  const [showFormEdit, setShowFormEdit] = useState(false)
  const [task, setTask] = useState([])


  useEffect(() => {
    async function fetchTask() {
      try {
        const taskRes = await API.get(`/collection/get-task?id=${id}`, tokenConfig)
        setTask(parserData(taskRes['data']))
      } catch (error) {
      }
    }
    fetchTask()
  }, [id])

  //add
  useEffect(() => {
    if (inputAdd === "") return
    const callAdd = async () => {
      try {
        const res = await API.post('/task/create', {
          description: inputAdd,
          collection_id: id
        }, tokenConfig)
        if (res.status === 200) {
          const taskRes = await API.get(`/collection/get-task?id=${id}`, tokenConfig)
          setTask(parserData(taskRes['data']))
        }
      } catch (error) {
        console.log(error)
      }
    }
    callAdd()
  }, [inputAdd, id])

  //edit
  useEffect(() => {
    if (inputEdit === "") return
    const callAdd = async () => {
      try {
        const res = await API.put('/task/update', {
          description: inputEdit,
          id: editID
        }, tokenConfig)
        if (res.status === 200) {
          const taskRes = await API.get(`/collection/get-task?id=${id}`, tokenConfig)
          setTask(parserData(taskRes['data']))
        }
      } catch (error) {
        console.log(error)
      }
    }
    callAdd()
  }, [inputEdit, id])

  // remove
  useEffect(() => {
    if (removeID === '') return
    const callRemoveTask = async () => {
      try {
        const res = await API.delete('/task/remove', {
          data: { id: removeID },
          headers: tokenConfig.headers
        })
        if (res.status === 200) {
          const taskRes = await API.get(`/collection/get-task?id=${id}`, tokenConfig)
          setTask(parserData(taskRes['data']))
        }
      } catch (error) {
        setTask([])
      }
    }
    callRemoveTask()
  }, [removeID, id])

  const handleOnClickAddTask = () => {
    setShowFormAdd(true)
  }

  const handleOnClickEditTask = id => {
    setFocus(id)
    setEditID(id)
    setShowFormEdit(true)
  }

  const handleOnClickRemoveTask = id => {
    setRemoveID(id)
  }

  const handleAddOnBlur = e => {
    if (e.target.value === '') {
      setShowFormAdd(false)
      return
    }
    setInputAdd(e.target.value)
    setShowFormAdd(false)
  }

  const handleEditOnBlur = () => {
    setFocus('')
    setShowFormEdit(false)
  }

  const handleCancelAdd = () => {
    setShowFormAdd(false)
  }

  const handleOnClickRemoveCollection = e => {
    if (!onClickRemoveCollection) return
    onClickRemoveCollection(e)
  }

  return (
    <div className="collection-wrapper">
      <div className="collection">
        <CollectionHeader title={title} collectionID={id} onClickRemove={handleOnClickRemoveCollection} />
        <div className="collection__list">
          {
            task.map(({ description, id }, index) => {
              return <Task focus={focus} description={description} id={id} key={index} onClickRemove={handleOnClickRemoveTask} onClickEdit={handleOnClickEditTask} />
            })
          }
        </div>
        {
          showFormEdit &&
          <div className="collection__edit">
            <Formik
              initialValues={{ editField: '' }}
              onSubmit={(values, { resetForm }) => {
                setFocus('')
                setInputEdit('')
                setInputEdit(values.editField)
                resetForm({ editField: '' })
                setShowFormEdit(false)
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
        }
        {showFormAdd &&
          <div className="collection__add-new">
            <Formik
              initialValues={{ addField: '' }}
              onSubmit={(values, { resetForm }) => {
                setInputAdd('')
                setInputAdd(values.addField)
                resetForm({ addField: '' })
                setShowFormAdd(false)
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
        }
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