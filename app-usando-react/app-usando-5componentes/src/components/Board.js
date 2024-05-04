import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Board.css';

const emojis = ['😀', '😎', '🥳', '🚀', '🌈', '🎉'];

const Board = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  const [showingEmoji, setShowingEmoji] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledEmojis = shuffle(emojis.concat(emojis));
    const initialCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji: emoji,
      flipped: false,
      matched: false,
    }));
    setCards(initialCards);
    setFlippedIndexes([]);
    setMatchedIndexes([]);
    setShowingEmoji(false);
  };

  const handleCardClick = (index) => {
    if (!showingEmoji && !matchedIndexes.includes(index)) {
      const newFlippedIndexes = [...flippedIndexes, index];
      setFlippedIndexes(newFlippedIndexes);
      if (newFlippedIndexes.length === 2) {
        setTimeout(() => {
          checkForMatch(newFlippedIndexes);
        }, 1000);
      }
    }
  };

  const checkForMatch = (flippedIndexes) => {
    const [index1, index2] = flippedIndexes;
    if (cards[index1].emoji === cards[index2].emoji) {
      setMatchedIndexes([...matchedIndexes, index1, index2]);
    } else {
      setFlippedIndexes([]);
      setShowingEmoji(true);
      setTimeout(() => {
        setShowingEmoji(false);
      }, 1000);
    }
  };

  const restartGame = () => {
    initializeGame();
  };

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  return (
    <div className="board-container">
      <div className="board">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            emoji={card.emoji}
            flipped={flippedIndexes.includes(index) || matchedIndexes.includes(index)}
            onClick={() => handleCardClick(index)}
            showingEmoji={showingEmoji}
          />
        ))}
      </div>
      <div className="game-controls">
        <button onClick={restartGame}>Reiniciar juego</button>
      </div>
    </div>
  );
};

export default Board;
