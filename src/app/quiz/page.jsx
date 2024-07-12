'use client';
import React, { useState } from 'react';
import { quiz } from '../data.js';


const Page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const { questions } = quiz;
  const { question, answers } = questions[activeQuestion];

  const onAnswerSelected = (answer, idx) => {
    setChecked(false);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    setSelectedAnswerIndex(null);
    setChecked(false);

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      fetchResult(newAnswers);
    }
  };

  const fetchResult = async (answers) => {
    try {
      const response = await fetch('http://localhost:3001/api/depression/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();
      setResult(data);
      setShowResult(true);
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    let resultClass = '';
    switch (result.type) {
      case 'Severe':
        resultClass = 'result-severe';
        break;
      case 'Moderate':
        resultClass = 'result-moderate';
        break;
      case 'Mild':
        resultClass = 'result-mild';
        break;
      default:
        break;
    }

    return (
      <div className={`result-container ${resultClass}`}>
        <h3>Results</h3>
        <p>Type of Depression: {result.type}</p>
        <p>Instructions: {result.instructions}</p>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  };

  const progressPercentage = ((activeQuestion + 1) / questions.length) * 100;

  return (
    <div className='container'>
      <h1>Quiz Page</h1>
      <div>
        <h2>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className='quiz-container'>
            <h3>{question}</h3>
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={
                  selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'
                }
              >
                <span>{answer}</span>
              </li>
            ))}
            <button
              onClick={nextQuestion}
              className={checked ? 'btn' : 'btn-disabled'}
              disabled={!checked}
            >
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        ) : (
          renderResult()
        )}
      </div>
      {!showResult && (
        <div className='progress-bar-container'>
          <div
            className='progress-bar'
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Page;
