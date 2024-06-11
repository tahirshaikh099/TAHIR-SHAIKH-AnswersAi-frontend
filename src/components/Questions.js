import React, { useState, useEffect, useContext } from 'react';
import api from '../service/Api';
import { AuthContext } from '../context/AuthContext';

const Questions = () => {
  const { auth } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (auth && auth.userId) {
        try {
          const response = await api.get(`users/${auth.userId}/questions`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          });
          setQuestions(response.data.data);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      }
    };

    fetchQuestions();
  }, [auth]);

  return (
    <div className="container">
      <h1>Questions</h1>
      <ul>
        {questions.map((question) => (
          <li className="questions-li" key={question._id}>{question.answer}</li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
