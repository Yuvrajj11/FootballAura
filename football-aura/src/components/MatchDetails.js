/*Working code 2*/

import { useLocation } from "react-router-dom"
import { Clock, MapPin, User, Calendar, Flag } from "lucide-react"

const MatchDetails = () => {
  const location = useLocation()
  const match = location.state?.match

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <p className="text-center text-2xl text-red-400">Match details not available.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* League Information */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-center">
          <img src={match.league.logo || "/placeholder.svg"} width={80} alt="League Logo" className="mx-auto mb-4" />
          <p className="font-bold text-2xl text-orange-400">{match.league.name}</p>
        </div>

        {/* Match Scoreboard */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="text-center w-1/3">
              <img
                src={match.teams.home.logo || "/placeholder.svg"}
                width={80}
                alt="Home Team Logo"
                className="mx-auto mb-2"
              />
              <p className="text-lg font-semibold">{match.teams.home.name}</p>
            </div>
            <div className="text-center w-1/3">
              <div className="text-5xl font-bold bg-gray-700 rounded-lg py-3 px-6 inline-block">
                {match.goals.home ?? "-"} : {match.goals.away ?? "-"}
              </div>
              <p className="text-lg text-orange-400 mt-2 font-semibold">{match.fixture.status.elapsed}'</p>
            </div>
            <div className="text-center w-1/3">
              <img
                src={match.teams.away.logo || "/placeholder.svg"}
                width={80}
                alt="Away Team Logo"
                className="mx-auto mb-2"
              />
              <p className="text-lg font-semibold">{match.teams.away.name}</p>
            </div>
          </div>
        </div>

        {/* Match Events */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <h2 className="bg-gray-700 p-4 text-orange-400 text-xl font-semibold">Events</h2>
          <div className="p-4">
            {match.events && match.events.length > 0 ? (
              match.events.map((event, index) => (
                <div
                  className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
                  key={index}
                >
                  <span className="text-sm font-medium">{event.player.name}</span>
                  <img src={event.team.logo || "/placeholder.svg"} width={24} alt="Team Logo" />
                  <span className="text-green-400 font-semibold">{event.time.elapsed}'</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No events recorded.</p>
            )}
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <h2 className="bg-gray-700 p-4 text-orange-400 text-xl font-semibold">Score Breakdown</h2>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">First Half:</span>
              <span className="text-lg">
                {match.score.halftime.home ?? "-"} : {match.score.halftime.away ?? "-"}
              </span>
            </div>
            {match.score.fulltime.home !== null && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Full Time:</span>
                <span className="text-lg">
                  {match.score.fulltime.home} : {match.score.fulltime.away}
                </span>
              </div>
            )}
            {match.score.extratime.home !== null && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Extra Time:</span>
                <span className="text-lg">
                  {match.score.extratime.home} : {match.score.extratime.away}
                </span>
              </div>
            )}
            {match.score.penalty.home !== null && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Penalty Shootout:</span>
                <span className="text-lg">
                  {match.score.penalty.home} : {match.score.penalty.away}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Match Details */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <h2 className="bg-gray-700 p-4 text-orange-400 text-xl font-semibold">Match Details</h2>
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-orange-400" />
              <span className="font-medium">Stadium:</span>
              <span>{match.fixture.venue.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-orange-400" />
              <span className="font-medium">Referee:</span>
              <span>{match.fixture.referee || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flag className="w-5 h-5 text-orange-400" />
              <span className="font-medium">Country:</span>
              <span>{match.league.country}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="font-medium">Round:</span>
              <span>{match.league.round}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-400" />
              <span className="font-medium">Season:</span>
              <span>{match.league.season}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchDetails

