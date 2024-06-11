import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Questions from './components/Questions';
import UserProfile from './components/UserProfile';
import Navigation from './components/Navigation';
import Register from './components/Register';
import AskQuestions from './components/AskQuestions';
import './App.css';

const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

const AppContent = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {auth && <AuthenticatedLayout />}
      <Routes>
        {/* <Route path="/" element={<AskQuestions />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {auth && (
          <>
            <Route path="/questions" element={<Questions />} />
            <Route path="/ask" element={<AskQuestions />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
          </>
        )}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
