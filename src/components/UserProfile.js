import React, { useState, useEffect, useContext } from 'react';
import api from '../service/Api';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
  const { auth, refreshToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth && auth.userId) {
        try {
          const response = await api.get(`/users/${auth.userId}`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          });
          setUser(response.data.data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };
    fetchUser();
  }, [auth]);

  return user ? (
    <div className="container">
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>UserId: {user._id}</p>
      <button onClick={() => refreshToken(auth.token)}>Reset Token</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default UserProfile;
