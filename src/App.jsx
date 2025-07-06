import { useState, useEffect } from 'react';
import './App.css';
import Card from './component/Card';

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const cardNames = [
    'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine', 'ten'
  ];

function App() {

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);

  // Shuffle cards on first load or after a round ends
  useEffect(() => {
    setShuffledCards(shuffleArray(cardNames));
  }, [score, clickedCards]);

  function handleCardClick(name) {
    if (clickedCards.includes(name)) {
      // Player clicked a card twice — reset
      if (score > bestScore) setBestScore(score);
      setScore(0);
      setClickedCards([]);
    } else {
      // Valid new click
      setScore(prev => prev + 1);
      setClickedCards(prev => [...prev, name]);
    }
  }

  return (
    <>
      <div className="scores">
        <h3>Score: {score}</h3>
        <h3>How good is your memory?!</h3>
        <h3>Best Score: {bestScore}</h3>
      </div>

      <div className="card-container">
        {shuffledCards.map(name => (
          <Card key={name} name={name} onClick={() => handleCardClick(name)} />
        ))}
      </div>
    </>
  );
}

export default App;
