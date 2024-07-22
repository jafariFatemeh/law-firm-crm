import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CaseManagement from './components/CaseManagement';
import ClientManagement from './components/ClientManagement';
import DocumentManagement from './components/DocumentManagement';
import CommunicationTools from './pages/CommunicationTools';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import './App.css';

const App = () => {
  const [token, setToken] = useState('');

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/cases">Cases</a></li>
            <li><a href="/clients">Clients</a></li>
            <li><a href="/documents">Documents</a></li>
            <li><a href="/communications">Communications</a></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/cases" component={CaseManagement} />
          <Route path="/clients" component={ClientManagement} />
          <Route path="/documents" component={DocumentManagement} />
          <Route path="/communications" component={CommunicationTools} />
          <Route path="/register" component={RegistrationForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;