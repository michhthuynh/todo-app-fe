import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopBar from '../Components/TopBar';
import Collection from '../Components/Collection';
import '../assets/Dashboard/Dashboard.scss'

function DashboardPage(props) {
  const logged = useSelector(state => state.user.isAuthentication)
  return (
    logged ?
      <div className="dashboard-wrapper">
        {/* <TopBar /> */}
        <Collection />
      </div>
      :
      <Redirect to="/auth/login" />
  );
}

export default DashboardPage;