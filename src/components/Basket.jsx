// src/components/Basket.jsx
"use client"

import PropTypes from "prop-types"

export default function Basket({ items, showAnimation }) {
  return (
    <div className="absolute bottom-4 right-4 w-48 h-48 pointer-events-none z-50">
      {/* 1) Basket “background” */}
      <img
        src="/images/basket.png"
        alt="Basket"
        className="w-full h-full object-contain"
      />

      {/* 2) Static fruits inside */}
      {!showAnimation &&
        items.map((item, idx) => (
          <img
            key={item.key}
            src={`/images/${item.fruit}.png`}
            alt={item.fruit}
            className="absolute w-12 h-12 z-10"
            style={{
              // shift each fruit up & over a bit
              bottom: `${1 + idx * 2}rem`,
              left:   `${1 + idx * 2}rem`,
            }}
          />
        ))
      }

      {/* 3) Fly‑away on win (unchanged) */}
      {showAnimation &&
        items.map((item, idx) => (
          <img
            key={`fly-${item.key}-${idx}`}
            src={`/images/${item.fruit}.png`}
            alt={item.fruit}
            className="absolute w-12 h-12 animate-fly-away"
            style={{
              "--tx": `${Math.random() * 400 - 200}px`,
              "--ty": `${-Math.random() * 300}px`,
              "--rotate": `${Math.random() * 720 - 360}deg`,
              "--delay": `${Math.random() * 0.5}s`,
              "--scale": `${Math.random() + 0.5}`,
            }}
          />
        ))
      }
    </div>
  )
}

Basket.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      fruit: PropTypes.string.isRequired,
      key:   PropTypes.string.isRequired,
    })
  ).isRequired,
  showAnimation: PropTypes.bool,
}

Basket.defaultProps = {
  showAnimation: false,
}
