"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Clock } from "lucide-react"

const LiveMatches = () => {
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const API_KEY = "208db13022df5292278c7921e4384c60"
  const API_URL = "https://v3.football.api-sports.io/fixtures?live=all"

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { "x-apisports-key": API_KEY },
        })
        setMatches(response.data.response.slice(0, 10)) // Show only 10 live matches
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching live matches:", error)
        setIsLoading(false)
      }
    }

    fetchMatches()
    const interval = setInterval(fetchMatches, 60000) // Refresh every 60 seconds
    return () => clearInterval(interval)
  }, [])

  const handleMatchClick = (match) => {
    navigate(`/match-details/${match.fixture.id}`, { state: { match } })
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-orange-400 tracking-wide">Live Matches</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-400"></div>
          </div>
        ) : matches.length === 0 ? (
          <p className="text-center text-xl text-red-400">No live matches available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div
                key={match.fixture.id}
                className="card-bg rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-orange-400/30 hover:scale-105"
                onClick={() => handleMatchClick(match)}
              >
                <div className="bg-gray-700 p-3">
                  <p className="text-lg font-semibold text-center text-orange-400">{match.league.name}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center w-1/3">
                      <img
                        src={match.teams.home.logo || "/placeholder.svg"}
                        alt={match.teams.home.name}
                        className="w-16 h-16 mx-auto mb-2"
                      />
                      <p className="font-semibold text-sm">{match.teams.home.name}</p>
                    </div>
                    <div className="text-center w-1/3">
                      <p className="text-3xl font-bold bg-gray-700 rounded-lg py-2 px-4">
                        {match.goals.home ?? "-"} : {match.goals.away ?? "-"}
                      </p>
                      <p className="text-xs mt-1 text-orange-400 flex items-center justify-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {match.fixture.status.elapsed}'
                      </p>
                    </div>
                    <div className="text-center w-1/3">
                      <img
                        src={match.teams.away.logo || "/placeholder.svg"}
                        alt={match.teams.away.name}
                        className="w-16 h-16 mx-auto mb-2"
                      />
                      <p className="font-semibold text-sm">{match.teams.away.name}</p>
                    </div>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-2">
                    Kick-off: {new Date(match.fixture.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LiveMatches

