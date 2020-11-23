import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopBar from '../Components/TopBar';
import Collection from '../Components/Collection';
import '../assets/Dashboard/Dashboard.scss'
import API from '../utils/API';
import tokenConfig from '../utils/tokenConfig';

function DashboardPage(props) {
  const logged = useSelector(state => state.user.isAuthentication)
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const fetchCollection = async () => {
      const userID = localStorage.getItem('user_id')
      const response = await API.get(`/collection/${userID}`, tokenConfig)
      setCollections(response['data'])
    }
    fetchCollection()

    // const getTask = id => new Promise((resolve, reject) => {
    //   API.get(`/collection/get-task?id=${id}`, tokenConfig)
    //     .then(({ data }) => {
    //       resolve(data)
    //     })
    //     .catch(err => {
    //       reject(err.message)
    //     })
    // })

    // const fetchIdCollection = async () => {
    //   const userID = localStorage.getItem('user_id')
    //   try {
    //     const collection = await fetchCollection(userID)
    //     collection.forEach(async ({ id }, index) => {
    //       const task = await getTask(id)
    //       data.push({
    //         title: collection[index]['title'],
    //         data: task
    //       })
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    //   setCollections(data)
    // }
    // fetchIdCollection()
    // console.log(collections)
  }, [])

  return (
    logged ?
      <div className="dashboard-wrapper">
        <TopBar />
        <div className="collection-list-wrapper" >
          {
            collections.map((value, index) => {
              return <Collection title={value['title']} id={value['_id']} key={index} />
            })
          }
        </div>
      </div>
      :
      <Redirect to="/auth/login" />
  );
}

export default DashboardPage;