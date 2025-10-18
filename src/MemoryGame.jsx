"use client"

import { useState, useEffect, useCallback } from "react"
import Board from "./components/Board"
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

  // FIX: Move allFruits inside useCallback so it's not a changing dependency
  const initializeGame = useCallback(() => {
    const allFruits = Object.keys(fruitImages)
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
  }, [pairCount])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const checkMatch = (secondIndex) => {
    const [firstIndex] = flipped
    setMoves((m) => m + 1)

    if (cards[firstIndex].fruit === cards[secondIndex].fruit) {
      // correct match
      setSolved((s) => [...s, firstIndex, secondIndex])
      setMatches((m) => m + 1)
      setBasket((b) => [
        ...b,
        { fruit: cards[firstIndex].fruit, key: `${secondIndex}-${Date.now()}` },
      ])
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
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-700 via-indigo-700 to-slate-900 text-white flex">
      {/* Left Sidebar - Scoreboard */}
      <aside className="w-64 min-h-screen p-6 flex flex-col gap-6">
        <div className="glass-panel rounded-2xl p-6 backdrop-blur-md border border-white/20 bg-white/10">
          <div className="flex items-center gap-3 mb-6">
            <img src="/images/basket.png" alt="Basket logo" className="w-10 h-10" />
            <div>
              <h1 className="text-white font-extrabold text-xl tracking-tight drop-shadow">Fruit Memory</h1>
              <p className="text-white/80 text-xs">Match the pairs!</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-3">
              <div className="text-emerald-300 text-xs font-semibold mb-1">Progress</div>
              <div className="text-2xl font-bold text-white">{Math.round((matches / pairCount) * 100)}%</div>
            </div>
            
            <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-3">
              <div className="text-purple-300 text-xs font-semibold mb-1">Moves</div>
              <div className="text-2xl font-bold text-white">{moves}</div>
            </div>
            
            <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-lg p-3">
              <div className="text-indigo-300 text-xs font-semibold mb-1">Matches</div>
              <div className="text-2xl font-bold text-white">{matches} / {pairCount}</div>
            </div>
          </div>
          
          <button
            onClick={initializeGame}
            className="mt-6 w-full px-4 py-3 rounded-lg bg-white/90 text-purple-700 font-semibold shadow hover:bg-white transition-all"
          >
            Reset Game
          </button>
        </div>
        
        <footer className="mt-auto text-white/60 text-xs text-center">
          Built with ❤️ using React and Tailwind CSS
        </footer>
      </aside>

      {/* Main Content - Game Board */}
      <main className="flex-1 min-h-screen p-6 flex items-center justify-center">
        <Board
          cards={cards}
          handleClick={handleClick}
          isFlipped={(i) => flipped.includes(i) || solved.includes(i)}
          isMatched={(i) => solved.includes(i)}
          fruitImages={fruitImages}
          splash={splash}
        />
      </main>

      {won && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl animate-bounce-in max-w-sm w-[90%] text-center">
            <h2 className="text-3xl font-extrabold text-purple-700 mb-2">You Win!</h2>
            <p className="text-slate-600 mb-6">Completed in {moves} moves</p>
            <button
              onClick={initializeGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow hover:from-purple-700 hover:to-indigo-700"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <Basket items={basket} showAnimation={showFruitAnimation} />
    </div>
  )
}
