import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EducationalControls from './components/EducationalControls';
import Chats from './components/Chats';
import AnalyticsComponent from './components/AnalyticsComponent';


const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <div className="w-1/5 bg-gray-200">
            <EducationalControls></EducationalControls>
          </div>
          <div className="w-3/5 bg-white">
            <Chats></Chats>
          </div>
          <div className="w-1/5 bg-gray-200">
            <AnalyticsComponent></AnalyticsComponent>
          </div>
        </div>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        </Routes>
      </div>
    </Router>
  );
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     localStorage.getItem('user')
//       ? <Component {...props} />
//       : <Navigate to='/login' />
//   )} />
// )

export default App;
