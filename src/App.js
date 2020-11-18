import { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { verifyLogin } from './actions/user';
import './App.scss';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import API from './utils/API';
import { useDispatch } from 'react-redux';
import DashboardPage from './Pages/Dashboard';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getAuth = async () => {
      API.get("/auth/login", {
        headers: {
          "Authorization": `bearer ${localStorage.getItem('token')}`
        }
      }).then(result => {
        localStorage.setItem("username", result.data.username)
        localStorage.setItem("user_id", result.data.id)
        dispatch(verifyLogin(true))
      }).catch(err => {
        dispatch(verifyLogin(false))
      })
    }
    getAuth()
  })

  return (
    <div className="App">
      <Suspense fallback={<div>Loading ...</div>}>
        <Router>
          <Route path="/" exact component={HomePage} />
          <Route path="/auth/login" exact component={LoginPage} />
          <Route path="/auth/register" exact component={RegisterPage} />
          <Route path="/dashboard" exact component={DashboardPage} />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
