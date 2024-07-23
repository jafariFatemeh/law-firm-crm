import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CaseManagement from './components/CaseManagement';
import ClientManagement from './components/ClientManagement';
import DocumentManagement from './components/DocumentManagement';
import CommunicationTools from './pages/CommunicationTools';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (token) => {
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Clear token from local storage
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="logo">Your Logo</div>
          <nav>
            <Link to="/home">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            {isAuthenticated && <a href="/" onClick={handleLogout}>Logout</a>}
          </nav>
        </header>
        <div className="main-content">
          <aside className="sidebar">
            <Link to="/clients">Clients</Link>
            <Link to="/cases">Cases</Link>
            <Link to="/documents">Documents</Link>
            <Link to="/communications">Communications</Link>
          </aside>
          <div className="content">
            <Switch>
              <Route path="/login">
              <Login onLoginSuccess={handleLoginSuccess} />
              </Route>
              <Route path="/register">
              <RegistrationForm onRegisterSuccess={handleRegisterSuccess} />
              </Route>
              <Route path="/dashboard">
                {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
              </Route>
              <Route path="/cases">
                {isAuthenticated ? <CaseManagement /> : <Redirect to="/login" />}
              </Route>
              <Route path="/clients">
                {isAuthenticated ? <ClientManagement /> : <Redirect to="/login" />}
              </Route>
              <Route path="/documents">
                {isAuthenticated ? <DocumentManagement /> : <Redirect to="/login" />}
              </Route>
              <Route path="/communications">
                {isAuthenticated ? <CommunicationTools /> : <Redirect to="/login" />}
              </Route>
              <Redirect from="/" to="/login" />
            </Switch>
          </div>
        </div>
        <footer className="footer">
          <p>© 2023 Your Company. All rights reserved.</p>
          <p><a href="/contact">Contact Support</a></p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
