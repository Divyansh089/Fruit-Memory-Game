"use client"

import { useState, useEffect } from "react"
import Board from "./components/Board"
import Scoreboard from "./components/Scoreboard"
import Basket from "./components/Basket"

const fruitImages = {
  apple: "/images/apple.png",
  banana: "/images/banana.png",
  cherry: "/images/cherry.png",
  grapes: "/images/grapes.png",
  lemon: "/images/lemon.png",
  orange: "/images/orange.png",
}

export default function MemoryGame() {
  const gridSize = 4 // 4×4 grid
  const totalCards = gridSize ** 2 // 16 cards
  const pairCount = totalCards / 2 // 8 pairs
  const allFruits = Object.keys(fruitImages)

  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [won, setWon] = useState(false)
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [basket, setBasket] = useState([])
  const [splash, setSplash] = useState(false)
  const [showFruitAnimation, setShowFruitAnimation] = useState(false)

  const initializeGame = () => {
    // 1) pick exactly 8 fruits (with repeat if needed) at random
    const pool = [...allFruits].sort(() => Math.random() - 0.5)
    const fruitsToUse = []
    while (fruitsToUse.length < pairCount) {
      if (pool.length === 0) {
        pool.push(...allFruits.sort(() => Math.random() - 0.5))
      }
      fruitsToUse.push(pool.pop())
    }

    // 2) build deck: two cards per fruit
    const deck = fruitsToUse.flatMap((fruit, index) => [
      { id: `${fruit}-A-${index}`, fruit },
      { id: `${fruit}-B-${index}`, fruit },
    ])

    // 3) shuffle
    deck.sort(() => Math.random() - 0.5)

    // reset all state
    setCards(deck)
    setFlipped([])
    setSolved([])
    setWon(false)
    setDisabled(false)
    setMoves(0)
    setMatches(0)
    setBasket([])
    setSplash(false)
    setShowFruitAnimation(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const checkMatch = (secondIndex) => {
    const [firstIndex] = flipped
    setMoves((m) => m + 1)

    if (cards[firstIndex].fruit === cards[secondIndex].fruit) {
      // correct match
      setSolved((s) => [...s, firstIndex, secondIndex])
      setMatches((m) => m + 1)
      setBasket((b) => [...b, { fruit: cards[firstIndex].fruit, key: `${secondIndex}-${Date.now()}` }])
      setFlipped([])
      setDisabled(false)
    } else {
      // wrong match → flip back
      setTimeout(() => {
        setFlipped([])
        setDisabled(false)
      }, 800)
    }
  }

  const handleClick = (idx) => {
    if (disabled || won) return
    if (flipped.includes(idx) || solved.includes(idx)) return

    if (flipped.length === 0) {
      setFlipped([idx])
    } else {
      setDisabled(true)
      setFlipped((f) => [...f, idx])
      checkMatch(idx)
    }
  }

  // on win → trigger splash animation
  useEffect(() => {
    if (solved.length === cards.length && cards.length) {
      setWon(true)
      setTimeout(() => {
        setSplash(true)
        setShowFruitAnimation(true)
        document.querySelectorAll(".card-inner").forEach((el) => {
          const tx = Math.random() * window.innerWidth - window.innerWidth / 2 + "px"
          const ty = -(Math.random() * window.innerHeight) + "px"
          el.style.setProperty("--tx", tx)
          el.style.setProperty("--ty", ty)
        })
      }, 300)
    }
  }, [solved, cards])

  return (
    <>
      
      
      <div className="w-full max-w-md mx-auto text-center relative">
        <Scoreboard moves={moves} matches={matches} />

        <div className="relative pt-16">
          

          <Board
            cards={cards}
            gridSize={gridSize}
            handleClick={handleClick}
            isFlipped={(i) => flipped.includes(i) || solved.includes(i)}
            fruitImages={fruitImages}
            splash={splash}
          />

          
        </div>

        {!won ? (
          <button
            onClick={initializeGame}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            Reset
          </button>
        ) : (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
            <div className="bg-white p-8 rounded-xl shadow-2xl animate-bounce-in">
              <h2 className="text-3xl font-bold text-purple-600 mb-4">You Win!</h2>
              <p className="text-gray-700 mb-6">Completed in {moves} moves</p>
              <button
                onClick={initializeGame}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-lg text-xl shadow-lg hover:from-purple-700 hover:to-purple-500 transition transform hover:scale-105"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
      <Basket items={basket} showAnimation={showFruitAnimation} />
    </>
  )
}
