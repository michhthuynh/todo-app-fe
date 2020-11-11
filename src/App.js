import { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

function App() {

  return (
    <div className="App">
      <Suspense fallback={<div>Loading ...</div>}>
        <Router>
          <Route path="/" exact component={HomePage} />
          <Route path="/auth/login" exact component={LoginPage} />
          <Route path="/auth/signup" exact component={RegisterPage} />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
