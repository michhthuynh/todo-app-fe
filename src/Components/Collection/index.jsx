import PropTypes from 'prop-types';
import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import Task from '../Task';
import './Collection.scss'
import API from '../../utils/API';
import tokenConfig from '../../utils/tokenConfig';

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
  const [isSending, setIsSending] = useState(false)
  const [task, setTask] = useState([])

  useEffect(() => {
    const fetchTask = async () => {
      const res = await API.get(`/collection/get-task?id=${id}`, tokenConfig)
      const parserRes = res['data']
      const data = parserRes.map(value => {
        return {
          description: value['description'],
          id: value['_id']
        }
      })
      setTask(data)
    }
    fetchTask()
  }, [])

  const sendRequest = useCallback(async id => {
    if (isSending) return
    setIsSending(true)
    await API.delete('/task/remove', {
      data: { id },
      headers: tokenConfig.headers
    })
    setIsSending(false)
  }, [isSending])

  const handleOnClickAddTask = id => {
  }

  const handleOnClickRemoveTask = id => {
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
              return <Task description={description} id={id} onClickAdd={sendRequest} onClickRemove={handleOnClickRemoveTask} key={index} />
            })
          }
        </div>
        <div className="collection__footer">
          <button className="collection__footer__btn">
            <span className="collection__footer__btn__icon"><FontAwesomeIcon icon={faPlus} /></span>
            <span className="collection__footer__btn__card">Add new task</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Collection;