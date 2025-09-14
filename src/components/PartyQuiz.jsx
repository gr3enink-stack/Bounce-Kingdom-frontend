import React, { useState } from 'react';
import './PartyQuiz.css';

const PartyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "What's your favorite color for a party?",
      options: [
        { text: "Bright Red", emoji: "🔴", style: "red" },
        { text: "Sunny Yellow", emoji: "🟡", style: "yellow" },
        { text: "Ocean Blue", emoji: "🔵", style: "blue" },
        { text: "Grass Green", emoji: "🟢", style: "green" }
      ]
    },
    {
      question: "What kind of party do you like best?",
      options: [
        { text: "Superhero Adventure", emoji: "🦸", style: "red" },
        { text: "Princess Celebration", emoji: "👸", style: "pink" },
        { text: "Pirate Treasure Hunt", emoji: "🏴‍☠️", style: "blue" },
        { text: "Animal Safari", emoji: "🦁", style: "green" }
      ]
    },
    {
      question: "What's your favorite party activity?",
      options: [
        { text: "Bouncing and Jumping", emoji: "🤸", style: "yellow" },
        { text: "Sliding and Splashing", emoji: "🛝", style: "blue" },
        { text: "Balloon Popping", emoji: "🎈", style: "pink" },
        { text: "Climbing and Exploring", emoji: "🧗", style: "green" }
      ]
    }
  ];

  const partyStyles = {
    red: {
      name: "Superhero Party",
      description: "Bold and exciting adventures await!",
      products: ["The Castle Adventure Combo", "The Pirate Ship Bounce House"]
    },
    yellow: {
      name: "Sunny Celebration",
      description: "Bright and cheerful fun for everyone!",
      products: ["Rainbow Balloon Pit", "The Castle Adventure Combo"]
    },
    blue: {
      name: "Ocean Adventure",
      description: "Cool and refreshing aquatic excitement!",
      products: ["Tropical Thunder Water Slide", "The Pirate Ship Bounce House"]
    },
    green: {
      name: "Nature Explorer",
      description: "Wild and wonderful outdoor adventures!",
      products: ["The Castle Adventure Combo", "Rainbow Balloon Pit"]
    },
    pink: {
      name: "Princess Palace",
      description: "Magical and enchanting royal celebrations!",
      products: ["The Castle Adventure Combo", "Rainbow Balloon Pit"]
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      // Add to score based on selected style
      setScore(prevScore => prevScore + (selectedAnswer.style === 'red' ? 1 : 
                                        selectedAnswer.style === 'yellow' ? 2 : 
                                        selectedAnswer.style === 'blue' ? 3 : 
                                        selectedAnswer.style === 'green' ? 4 : 5));
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const getResultStyle = () => {
    if (score <= 4) return 'red';
    if (score <= 7) return 'yellow';
    if (score <= 10) return 'blue';
    if (score <= 13) return 'green';
    return 'pink';
  };

  const resultStyle = getResultStyle();
  const result = partyStyles[resultStyle];

  return (
    <div className="party-quiz">
      <div className="quiz-container">
        {!showResult ? (
          <>
            <div className="quiz-header">
              <h2>What's Your Party Style?</h2>
              <p>Answer a few fun questions to discover your perfect party!</p>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="question-section">
              <h3>{questions[currentQuestion].question}</h3>
              
              <div className="options-container">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`option ${selectedAnswer === option ? 'selected' : ''} ${option.style}`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <span className="option-emoji">{option.emoji}</span>
                    <span className="option-text">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              className="next-btn"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results!'}
            </button>
          </>
        ) : (
          <div className="result-section">
            <h2>Your Perfect Party Style:</h2>
            <div className={`result-card ${resultStyle}`}>
              <h3>{result.name}</h3>
              <p>{result.description}</p>
              <div className="recommended-products">
                <h4>Perfect For You:</h4>
                <ul>
                  {result.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
              <button className="restart-btn" onClick={resetQuiz}>
                Take Quiz Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartyQuiz;