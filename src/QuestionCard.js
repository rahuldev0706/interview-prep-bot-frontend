import React, { useEffect, useState } from 'react';

const QuestionCard = () => {
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);

  const fetchQuestion = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/questions/random");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      console.log(data)
      setQuestion(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: '2rem auto' }}>
      <h2>🧠 Interview Question</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {question ? (
        <>
          <p><strong>Type:</strong> {question.type}</p>
          <p><strong>Question:</strong> {question.question}</p>
          <p><strong>Ideal Answer:</strong> {question.idealAnswer}</p>
          <button onClick={fetchQuestion}>Next Question</button>
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default QuestionCard;
