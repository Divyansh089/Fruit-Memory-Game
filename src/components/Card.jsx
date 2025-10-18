"use client"

import PropTypes from "prop-types"

export default function Card({ card, onClick, flipped, matched, fruitImages }) {
  return (
    <div
      className="group w-full aspect-square cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`Card ${card.fruit}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <div
        className="card-inner relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s ease-in-out',
        }}
      >
        {/* Front face: card back image */}
        <div
          className="absolute w-full h-full rounded-2xl shadow-lg overflow-hidden border border-white/20 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 group-hover:from-purple-500/30 group-hover:to-indigo-500/30 transition-all"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundImage: "url('/images/card-back.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply",
          }}
        >
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Back face: fruit image */}
        <div 
          className="absolute w-full h-full rounded-2xl shadow-xl flex items-center justify-center p-3 bg-gradient-to-br from-white to-white/90 border border-slate-200"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <img
            src={fruitImages[card.fruit] || "/placeholder.svg"}
            alt={card.fruit}
            className={`w-3/4 h-auto object-contain transition-transform ${matched ? "scale-110 opacity-80" : ""}`}
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
  matched:     PropTypes.bool,
  fruitImages: PropTypes.objectOf(PropTypes.string).isRequired,
}

Card.defaultProps = {
  matched: false,
}
