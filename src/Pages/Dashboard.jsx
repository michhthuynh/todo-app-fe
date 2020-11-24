import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopBar from '../Components/TopBar';
import Collection from '../Components/Collection';
import '../assets/Dashboard/Dashboard.scss'
import API from '../utils/API';
import tokenConfig from '../utils/tokenConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCollectionForm from '../Components/AddCollectionForm';

function DashboardPage(props) {
  const logged = useSelector(state => state.user.isAuthentication)
  const [collections, setCollections] = useState([])
  const [collectionIDRemove, setCollectionIDRemove] = useState('')
  const [test, setTest] = useState('')
  const [newCollectionID, setNewCollectionID] = useState('')
  const [newCollection, setNewCollection] = useState([])
  const [showFormAddCollection, setShowFormAddCollection] = useState(false)
  const [addCollection, setAddCollection] = useState({})

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const userID = localStorage.getItem('user_id')
        const response = await API.get(`/collection/${userID}`, tokenConfig)
        const temp = response['data']
        console.log(temp)
        setCollections(temp)
      } catch (error) {
        setCollections([])
      }
    }
    fetchCollection()
  }, [newCollection, newCollectionID, test])

  useEffect(() => {
    if (collectionIDRemove === '') return
    const callRemoveCollection = async () => {
      try {
        const res = await API.delete('/collection/remove', {
          data: { id: collectionIDRemove },
          headers: tokenConfig.headers
        })
        if (res.status === 200) {
          setTest(collectionIDRemove)
        }
      } catch (error) {
        console.log("Can not connect database: ", error.message)
      }
    }
    callRemoveCollection()
  }, [collectionIDRemove])

  useEffect(() => {
    if (Object.keys(addCollection).length === 0) return
    const { title, id } = addCollection
    const userID = localStorage.getItem('user_id')
    const callAddCollection = async () => {
      try {
        const res = await API.post('/collection/create', {
          title,
          user_id: userID
        }, tokenConfig)

        if (res.status === 200) {
          setNewCollectionID(id)
        }
      } catch (error) {
        console.log("Can not connect database: ", error.message)
      }
    }
    callAddCollection()
  }, [addCollection])

  const handleOnClickRemove = e => {
    setCollectionIDRemove(e)
  }

  const handleOnClickAdd = () => {
    setShowFormAddCollection(true)
  }

  const handleOnSubmitAddCollection = e => {
    setAddCollection(e)
  }

  return (
    logged ?
      <div className="dashboard-wrapper">
        <TopBar />
        <div className="collection-list-wrapper" >
          {
            collections.map((value, index) => {
              return <Collection title={value['title']} id={value['_id']} key={index} onClickRemoveCollection={handleOnClickRemove} />
            })
          }
          <div className="collection__add-collection">
            <button onClick={handleOnClickAdd}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <AddCollectionForm showForm={showFormAddCollection} onSubmit={handleOnSubmitAddCollection} />
          </div>
        </div>
      </div>
      :
      <Redirect to="/auth/login" />
  );
}

export default DashboardPage;