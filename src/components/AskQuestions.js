import React, { useState, useContext } from 'react';
import api from '../service/Api';
import { AuthContext } from '../context/AuthContext';

const AskQuestions = () => {
    const { auth } = useContext(AuthContext);
    const [questionText, setQuestionText] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/questions', { questionText }, { headers: { Authorization: `Bearer ${auth.token}` } });
            setAnswer(response.data.data.answer);
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="Ask a question" required />
                <button className="ask-button" type="submit">Ask</button>
            </form>
            {answer && <div className="answer"><strong>Answer:</strong> {answer}</div>}
        </div>
    );
};

export default AskQuestions;
