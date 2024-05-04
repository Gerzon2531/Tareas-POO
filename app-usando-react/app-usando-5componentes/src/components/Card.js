import React from 'react';

const Card = ({ emoji, flipped, matched, onClick, showingEmoji }) => {
  return (
    <div className={`card ${flipped || matched ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          {showingEmoji ? <span role="img" aria-label="emoji">{emoji}</span> : <span role="img" aria-label="question">❓</span>}
        </div>
        <div className="card-back">
          <span role="img" aria-label="emoji">{emoji}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
