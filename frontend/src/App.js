import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from './services/axiosConfig';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />}
          </Route>
          <Route path="/register">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <RegistrationForm />}
          </Route>
          <Route path="/dashboard">
            {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
