/*Working code 2*/

"use client"

import { useState, useEffect } from "react"
import axios from "axios"

function Standings() {
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiKey = "208db13022df5292278c7921e4384c60"

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://v3.football.api-sports.io/standings?league=39&season=2023", {
          headers: { "x-apisports-key": apiKey },
        })

        if (response.data.response && response.data.response.length > 0 && response.data.response[0].league.standings) {
          setStandings(response.data.response[0].league.standings[0])
        } else {
          throw new Error("No standings data available.")
        }
      } catch (err) {
        console.error("Error fetching standings:", err)
        setError("Failed to load standings. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchStandings()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-400"></div>
      </div>
    )
  if (error) return <div className="text-center text-red-500 text-xl p-4">{error}</div>

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-orange-400">Premier League Standings</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Pos</th>
                <th className="py-3 px-4 text-left">Team</th>
                <th className="py-3 px-4 text-center">P</th>
                <th className="py-3 px-4 text-center">W</th>
                <th className="py-3 px-4 text-center">D</th>
                <th className="py-3 px-4 text-center">L</th>
                <th className="py-3 px-4 text-center">GF</th>
                <th className="py-3 px-4 text-center">GA</th>
                <th className="py-3 px-4 text-center">GD</th>
                <th className="py-3 px-4 text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr
                  key={team.team.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                  } hover:bg-gray-700 transition-colors duration-200`}
                >
                  <td className="py-3 px-4">{team.rank}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={team.team.logo || "/placeholder.svg"} alt={team.team.name} className="w-6 h-6" />
                      <span className="font-medium">{team.team.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">{team.all.played}</td>
                  <td className="py-3 px-4 text-center">{team.all.win}</td>
                  <td className="py-3 px-4 text-center">{team.all.draw}</td>
                  <td className="py-3 px-4 text-center">{team.all.lose}</td>
                  <td className="py-3 px-4 text-center">{team.all.goals.for}</td>
                  <td className="py-3 px-4 text-center">{team.all.goals.against}</td>
                  <td className="py-3 px-4 text-center">{team.goalsDiff}</td>
                  <td className="py-3 px-4 text-center font-bold">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Standings

