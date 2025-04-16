import PropTypes from "prop-types"

export default function Scoreboard({ moves, matches }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex flex-row justify-between mb-4  ">
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 text-white">
        <span className="font-bold">Moves:</span>
        <span className="text-2xl font-extrabold">{moves}</span>
      </div>
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 text-white">
        <span className="font-bold">Matches:</span>
        <span className="text-2xl font-extrabold">{matches}</span>
      </div>
    </div>
  )
}

Scoreboard.propTypes = {
  moves: PropTypes.number.isRequired,
  matches: PropTypes.number.isRequired,
}
