"use client"

import PropTypes from "prop-types"
import Card from "./Card"

export default function Board({ cards, handleClick, isFlipped, isMatched, fruitImages, splash }) {
  return (
    <div className="glass-panel w-full max-w-2xl mx-auto rounded-2xl p-4 shadow-2xl backdrop-blur-md border border-white/20 bg-white/10">
      <div
        className={`grid grid-cols-4 w-full gap-3 ${splash ? "splash" : ""}`}
        role="grid"
        aria-label="Memory cards grid"
      >
        {cards.map((card, i) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleClick(i)}
            flipped={isFlipped(i)}
            matched={isMatched(i)}
            fruitImages={fruitImages}
          />
        ))}
      </div>
    </div>
  )
}

Board.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fruit: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  isFlipped: PropTypes.func.isRequired,
  isMatched: PropTypes.func.isRequired,
  fruitImages: PropTypes.objectOf(PropTypes.string).isRequired,
  splash: PropTypes.bool.isRequired,
}
