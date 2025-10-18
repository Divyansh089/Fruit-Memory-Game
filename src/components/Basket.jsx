// src/components/Basket.jsx
"use client"

import PropTypes from "prop-types"

export default function Basket({ items, showAnimation }) {
  // predetermined slots inside an oval clipping area so the fruit appears tucked in the basket
  const fruitSlots = [
    { bottom: "6%", left: "30%", rotate: "-10deg", scale: 0.82, zIndex: 1 },
    { bottom: "12%", left: "55%", rotate: "6deg", scale: 0.9, zIndex: 2 },
    { bottom: "20%", left: "38%", rotate: "3deg", scale: 0.88, zIndex: 3 },
    { bottom: "2%", left: "48%", rotate: "-6deg", scale: 0.78, zIndex: 1 },
    { bottom: "16%", left: "68%", rotate: "12deg", scale: 0.85, zIndex: 2 },
    { bottom: "8%", left: "18%", rotate: "-14deg", scale: 0.8, zIndex: 1 },
    { bottom: "26%", left: "60%", rotate: "8deg", scale: 0.86, zIndex: 4 },
    { bottom: "24%", left: "32%", rotate: "14deg", scale: 0.84, zIndex: 3 },
  ]

  return (
    <div className="absolute bottom-4 right-4 w-48 h-48 pointer-events-none z-50">
      {/* 1) Basket background (rear) */}
      <img
        src="/images/basket.png"
        alt="Basket"
        className="absolute inset-0 w-full h-full object-contain z-10"
      />

      {/* 2) Static fruits inside the basket body */}
      {!showAnimation && (
        <div
          className="absolute w-[65%] h-[48%] left-1/2 z-20"
          style={{
            bottom: "1.5rem",
            transform: "translateX(-50%)",
            clipPath: "ellipse(60% 55% at 50% 60%)",
            overflow: "hidden",
          }}
        >
          {items.map((item, idx) => {
            const slot = fruitSlots[idx % fruitSlots.length]
            return (
              <img
                key={item.key}
                src={`/images/${item.fruit}.png`}
                alt={item.fruit}
                className="absolute w-12 h-12"
                style={{
                  bottom: slot.bottom,
                  left: slot.left,
                  transform: `translate(-50%, 0) rotate(${slot.rotate}) scale(${slot.scale})`,
                  zIndex: slot.zIndex,
                }}
              />
            )
          })}
        </div>
      )}

      {/* 2b) Front rim overlay to hide upper parts of the fruit */}
      {!showAnimation && (
        <div
          className="absolute inset-0 z-30"
          style={{
            clipPath: "polygon(0% 55%, 100% 55%, 100% 100%, 0% 100%)",
            backgroundImage: "url('/images/basket.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />
      )}

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
