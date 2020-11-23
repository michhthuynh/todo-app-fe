import PropTypes from 'prop-types';
import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Task from '../Task';
import './Collection.scss'
import API from '../../utils/API';
import tokenConfig from '../../utils/tokenConfig';
import { FastField, Formik } from 'formik';
import InputField from '../../custom-fields/InputField';

Collection.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
};

Collection.defaultProps = {
  title: '',
  id: '',
}

function Collection(props) {
  const { title, id } = props
  const [remove, setRemove] = useState('')
  const [inputAdd, setInputAdd] = useState('')
  const [isRun, setIsRun] = useState(false)
  const [reload, setReload] = useState('')
  const [task, setTask] = useState([])

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await API.get(`/collection/get-task?id=${id}`, tokenConfig)
        const parserRes = res['data']
        const data = parserRes.map(value => {
          return {
            description: value['description'],
            id: value['_id']
          }
        })
        setTask(data)
      } catch (error) {
        setTask([])
      }
    }

    fetchTask()
  }, [reload, id])

  // remove
  useEffect(() => {
    if (remove === '') return
    const callRemove = async () => {
      try {
        const res = await API.delete('/task/remove', {
          data: { id: remove },
          headers: tokenConfig.headers
        })
        if (res.status === 200) {
          setReload(`remove_${remove}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
    callRemove()
  }, [remove])

  //add
  useEffect(() => {
    const callAdd = async () => {
      try {
        const res = await API.post('/task/create', {
          description: inputAdd,
          collection_id: id
        }, tokenConfig)
        if (res.status === 200) {
          setReload(`add_${Math.random()}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
    callAdd()
  }, [inputAdd, id])

  const handleOnClickAddTask = () => {
    setIsRun(true)
  }

  const handleOnClickEditTask = id => {

  }

  const handleOnClickRemoveTask = id => {
    setRemove(id)
  }


  return (
    <div className="collection-wrapper">
      <div className="collection">
        <div className="collection__header">
          <div className="collection__header__title">
            {title}
          </div>
          <button className="collection__header__btn">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>
        <div className="collection__list">
          {
            task.map(({ description, id }, index) => {
              return <Task description={description} id={id} onClickAdd={handleOnClickEditTask} onClickRemove={handleOnClickRemoveTask} key={index} />
            })
          }
        </div>
        <div className="collection__add-new">
          {isRun && <Formik
            initialValues={{ username: '' }}
            onSubmit={(values) => {
              setInputAdd(values.username)
            }}
          >
            {
              formProps => {
                return (
                  <form onSubmit={formProps.handleSubmit}>
                    <FastField
                      name='username'
                      component={InputField}

                      placeholder="Enter username"
                      className="username"
                    />
                    <button type="submit">
                      Add
                    </button>
                  </form>
                )
              }
            }
          </Formik>}
        </div>
        <div className="collection__footer">
          <button className="collection__footer__btn" onClick={handleOnClickAddTask}>
            <span className="collection__footer__btn__icon"><FontAwesomeIcon icon={faPlus} /></span>
            <span className="collection__footer__btn__card">Add new task</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Collection;