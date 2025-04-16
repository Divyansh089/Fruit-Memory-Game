"use client"

import PropTypes from "prop-types"
import Card from "./Card"

export default function Board({ cards, gridSize, handleClick, isFlipped, fruitImages, splash }) {
  return (
    <div
      className={`grid gap-2 ${splash ? "splash" : ""} max-w-[500px]`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
      }}
    >
      {cards.map((card, i) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => handleClick(i)}
          flipped={isFlipped(i)}
          fruitImages={fruitImages}
        />
      ))}
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
  gridSize: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  isFlipped: PropTypes.func.isRequired,
  fruitImages: PropTypes.objectOf(PropTypes.string).isRequired,
  splash: PropTypes.bool.isRequired,
}
