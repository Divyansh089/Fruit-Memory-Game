"use client"

import PropTypes from "prop-types"

export default function Card({ card, onClick, flipped, fruitImages }) {
  return (
    <div
      className="w-full aspect-[3/4] perspective-1000 mb-2.5 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-600 transform-style-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front face: card back image */}
        <div
          className="absolute w-full h-full backface-hidden rounded-xl shadow-md"
          style={{
            backgroundImage: "url('/images/card-back.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Back face: fruit image */}
        <div className="absolute w-full h-full backface-hidden rounded-xl shadow-md flex items-center justify-center p-3 bg-white rotate-y-180">
          <img
            src={fruitImages[card.fruit] || "/placeholder.svg"}
            alt={card.fruit}
            className="w-3/4 h-auto object-contain transform hover:scale-110 transition-transform"
          />
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.shape({
    id:    PropTypes.string.isRequired,
    fruit: PropTypes.string.isRequired,
  }).isRequired,
  onClick:     PropTypes.func.isRequired,
  flipped:     PropTypes.bool.isRequired,
  fruitImages: PropTypes.objectOf(PropTypes.string).isRequired,
}
