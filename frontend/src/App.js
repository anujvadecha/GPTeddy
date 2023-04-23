import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EducationalControls from './components/EducationalControls';
import Chats from './components/Chats';
import AnalyticsComponent from './components/AnalyticsComponent';
import { loginAdminUser } from "./utilities/api_calls.js"

const App = () => {

  useEffect(() => {
    loginAdminUser().then(res => {
      window.localStorage.setItem("token", "Bearer " + res.access)
    })

  }, [])


  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <div className="w-1/5 bg-orange-100">
            <EducationalControls></EducationalControls>
          </div>
          <div className="w-3/5 bg-white">
            <Chats></Chats>
          </div>
          <div className="w-1/5 bg-orange-100">
            <AnalyticsComponent></AnalyticsComponent>
          </div>
        </div>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />        </Routes>
      </div>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('token')
      ? <Component {...props} />
      : <Navigate to='/login' />
  )} />
)

export default App;
