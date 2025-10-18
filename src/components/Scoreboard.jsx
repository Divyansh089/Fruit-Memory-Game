import PropTypes from "prop-types"

export default function Scoreboard({ moves, matches, totalPairs, onReset }) {
  const progress = Math.round((matches / totalPairs) * 100)
  return (
    <header className="sticky top-0 z-20 -mx-4 sm:-mx-6 mb-4">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="flex items-center justify-between rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg py-3 px-4">
          <div className="flex items-center gap-3">
            <img src="/images/basket.png" alt="Basket logo" className="w-8 h-8" />
            <div>
              <h1 className="text-white font-extrabold tracking-tight drop-shadow">Fruit Memory</h1>
              <p className="text-white/80 text-xs">Match the pairs to win</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-sm shadow">
              <span className="font-semibold">{progress}%</span>
              <span className="opacity-90">complete</span>
            </span>
            <div className="flex items-center gap-2 text-white">
              <span className="px-3 py-1 rounded-lg bg-purple-600/90 shadow"><strong>Moves</strong>: {moves}</span>
              <span className="px-3 py-1 rounded-lg bg-indigo-600/90 shadow"><strong>Matches</strong>: {matches}/{totalPairs}</span>
            </div>
            {onReset && (
              <button onClick={onReset} className="ml-2 px-3 py-2 rounded-lg bg-white/90 text-purple-700 font-semibold hover:bg-white shadow">
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

Scoreboard.propTypes = {
  moves: PropTypes.number.isRequired,
  matches: PropTypes.number.isRequired,
  totalPairs: PropTypes.number.isRequired,
  onReset: PropTypes.func,
}
