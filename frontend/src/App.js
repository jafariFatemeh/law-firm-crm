import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="logo">Your Logo</div>
          <nav>
            <a href="/home">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/profile">Profile</a>
            <a href="/logout">Logout</a>
          </nav>
        </header>
        <div className="main-content">
          <aside className="sidebar">
            <a href="/clients">Clients</a>
            <a href="/cases">Cases</a>
            <a href="/documents">Documents</a>
            <a href="/communications">Communications</a>
          </aside>
          <div className="content">
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
        </div>
        <footer className="footer">
          <p>© 2023 Your Company. All rights reserved.</p>
          <p><a href="/contact">Contact Support</a></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
