import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav>
      <div>
        {auth && (
          <>
            <Link to="/questions">Questions</Link>
            <Link to="/ask">Ask</Link>
            <Link to={`/profile/${auth.userId}`}>Profile</Link>
          </>
        )}
      </div>
      <div>
        {auth ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
