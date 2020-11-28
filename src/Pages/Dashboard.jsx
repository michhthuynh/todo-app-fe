import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopBar from '../Components/TopBar';
import Collection from '../Components/Collection';
import '../assets/Dashboard/Dashboard.scss'
import API from '../utils/API';
import tokenConfig from '../utils/tokenConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import AddCollectionForm from '../Components/AddCollectionForm';

const randomID = () => {
  return Math.ceil(Math.random() * Math.pow(10, 8))
}



function DashboardPage(props) {
  const logged = useSelector(state => state.user.isAuthentication)
  const [collections, setCollections] = useState([])
  const [collectionIDRemove, setCollectionIDRemove] = useState('')
  const [removeTask, setRemoveTask] = useState('')
  const [addTask, setAddTask] = useState({})
  const [changeDes, setChangeDes] = useState({})
  const [reload, setReload] = useState('')
  const [changeTitle, setChangeTitle] = useState({})
  const [showFormAddCollection, setShowFormAddCollection] = useState(false)
  const [addCollection, setAddCollection] = useState({})

  const callReload = () => {
    setReload(randomID())
  }
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const userID = localStorage.getItem('user_id')
        const response = await API.get(`/collection/${userID}/task`, tokenConfig)
        const data = response['data']["message"]
        setCollections(data)
      } catch (error) {
        setCollections([])
      }
    }
    fetchCollection()
  }, [reload])

  // api remove collection
  useEffect(() => {
    if (collectionIDRemove === '') return
    const callRemoveCollection = async () => {
      try {
        const res = await API.delete('/collection/remove', {
          data: { id: collectionIDRemove },
          headers: tokenConfig.headers
        })
        if (res.status === 200) {
          callReload()
        }
      } catch (error) {
        console.error("Can not connect database: ", error.message)
      }
    }
    callRemoveCollection()
  }, [collectionIDRemove])

  // api add new collection
  useEffect(() => {
    if (Object.keys(addCollection).length === 0) return

    const userID = localStorage.getItem('user_id')
    const callAddCollection = async () => {
      try {
        const res = await API.post('/collection/create', {
          title: addCollection.title,
          user_id: userID
        }, tokenConfig)

        if (res.status === 200) {
          callReload()
        }
      } catch (error) {
        console.error("Can not connect database: ", error.message)
      }
    }
    callAddCollection()
  }, [addCollection])

  // api change title
  useEffect(() => {
    if (Object.keys(changeTitle).length === 0) return
    const { collectionID, title } = changeTitle
    const callChangeTitle = async () => {
      try {
        const res = await API.put(`/collection/${collectionID}/title`, {
          title
        }, tokenConfig)

        if (res.status === 200) {
          setReload(randomID())
        }
      } catch (error) {
        console.error("Can not connect database: ", error.message)
      }
    }
    callChangeTitle()
  }, [changeTitle])

  // add task
  useEffect(() => {
    if (Object.keys(addTask).length === 0) return
    const callAddTask = async () => {
      try {
        const res = await API.post('/task/create', {
          description: addTask.description,
          collection_id: addTask.collectionID
        }, tokenConfig)
        if (res.status === 200) {
          callReload()
        }
      } catch (error) {
        console.error("Can not connect database: ", error.message)
      }
    }
    callAddTask()
  }, [addTask])

  // change description
  useEffect(() => {
    if (Object.keys(changeDes).length === 0) return
    const callAddTask = async () => {
      try {
        const res = await API.put('/task/update/desc', {
          description: changeDes.description,
          id: changeDes.taskID
        }, tokenConfig)
        if (res.status === 200) {
          callReload()
        }
      } catch (error) {
        console.error("Can not connect database: ", error.message)
      }
    }
    callAddTask()
  }, [changeDes])

  // Remove Task
  useEffect(() => {
    if (removeTask === '') return
    const callRemoveTask = async () => {
      try {
        const res = await API.delete('/task/remove', {
          data: {
            id: removeTask
          },
          headers: tokenConfig.headers
        })
        if (res.status === 200) {
          callReload()
        }
      } catch (error) {
        console.error("Cannot remove task ...")
      }
    }
    callRemoveTask()
  }, [removeTask])

  const handleOnClickRemove = e => {
    setCollectionIDRemove(e)
  }

  const handleOnSubmitAddCollection = e => {
    const temp = {
      title: e,
      id: randomID()
    }
    setAddCollection(temp)
    setShowFormAddCollection(false)
  }

  const handleOnClickAdd = () => {
    setShowFormAddCollection(true)
  }

  const handleAddTask = e => {
    setAddTask(e)
  }

  const handleOnChangeTitle = e => {
    setChangeTitle(e)
  }

  const handleChangeDesc = e => {
    setChangeDes(e)
  }

  const handleRemoveTask = e => {
    setRemoveTask(e)
  }

  const handleDisplayAddCollectionForm = () => {
    setShowFormAddCollection(false)
  }

  return (
    logged ?
      <div className="dashboard-wrapper">
        <TopBar />
        <div className="collection-list-wrapper" >
          {
            collections.map(({ title, collection_id, task_list }, index) => {
              return <Collection
                title={title}
                collectionID={collection_id}
                tasks={task_list}
                key={index}
                onClickRemoveCollection={handleOnClickRemove}
                onChangeTitle={handleOnChangeTitle}
                onAddTask={handleAddTask}
                onChangeDesc={handleChangeDesc}
                onRemoveTask={handleRemoveTask}
              />
            })
          }
          <div className="collection__add-collection">
            {
              !showFormAddCollection ?
                <button onClick={handleOnClickAdd} className="collection__add-collection__btn-show">
                  <FontAwesomeIcon icon={faPlus} />
                </button> :
                <div className="collection__add-collection__control">
                  <AddCollectionForm onSubmit={handleOnSubmitAddCollection} />
                  <button onClick={handleDisplayAddCollectionForm} className="collection__add-collection__control__btn-cancel">
                    <span>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </button>
                </div>

            }
          </div>
        </div>
      </div>
      :
      <Redirect to="/auth/login" />
  );
}

export default DashboardPage;