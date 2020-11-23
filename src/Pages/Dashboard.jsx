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