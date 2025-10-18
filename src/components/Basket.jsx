// src/components/Basket.jsx
"use client"

import PropTypes from "prop-types"

export default function Basket({ items, showAnimation }) {
  // predetermined slots so collected fruits settle inside the basket instead of lining up
  const fruitSlots = [
    { bottom: "2.5rem", left: "2.5rem", rotate: "-6deg", zIndex: 3 },
    { bottom: "3rem", left: "3.6rem", rotate: "8deg", zIndex: 4 },
    { bottom: "2rem", left: "3rem", rotate: "2deg", zIndex: 2 },
    { bottom: "1.4rem", left: "2.2rem", rotate: "-12deg", zIndex: 1 },
    { bottom: "1.8rem", left: "3.8rem", rotate: "12deg", zIndex: 1 },
    { bottom: "2.6rem", left: "1.8rem", rotate: "-4deg", zIndex: 2 },
    { bottom: "2.1rem", left: "4.4rem", rotate: "6deg", zIndex: 2 },
    { bottom: "3.4rem", left: "2.2rem", rotate: "15deg", zIndex: 5 },
  ]

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
            className="absolute w-12 h-12"
            style={{
              // pick a slot so fruit looks tucked into the basket
              bottom: fruitSlots[idx % fruitSlots.length].bottom,
              left: fruitSlots[idx % fruitSlots.length].left,
              transform: `rotate(${fruitSlots[idx % fruitSlots.length].rotate})`,
              zIndex: fruitSlots[idx % fruitSlots.length].zIndex,
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
