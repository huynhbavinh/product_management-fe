import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeComponent from './pages/home/home.page';
import LoginComponent from './pages/login/login.page';
import RegisterComponent from './pages/register/register.page';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </Router>
  );
};

export default App;