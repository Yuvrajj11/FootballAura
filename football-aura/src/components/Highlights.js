/*Working code 2*/

"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"

const footballApiKey = "208db13022df5292278c7921e4384c60" // Replace with API-FOOTBALL key
const youtubeApiKey = "AIzaSyAF2eDZiiJLzvkMn5KPVj7cPwEYDH6fXeU" // Replace with YouTube API key

const fetchLatestMatches = async () => {
  try {
    const response = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
      method: "GET",
      headers: {
        "x-apisports-key": footballApiKey,
      },
    })

    if (!response.ok) throw new Error(`API error! Status: ${response.status}`)

    const data = await response.json()
    console.log("API-FOOTBALL Data:", data)
    if (!data.response || data.response.length === 0) {
      console.warn("No matches found.")
      return []
    }

    return data.response.slice(0, 3)
  } catch (error) {
    console.error("Error fetching matches:", error)
    return []
  }
}

const fetchYouTubeHighlights = async (homeTeam, awayTeam) => {
  const searchQuery = `${homeTeam} vs ${awayTeam} football highlights`
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        searchQuery,
      )}&type=video&maxResults=1&key=${youtubeApiKey}`,
    )

    if (!response.ok) throw new Error(`YouTube API error! Status: ${response.status}`)

    const data = await response.json()
    console.log(`YouTube Data for ${homeTeam} vs ${awayTeam}:`, data)

    if (!data.items || data.items.length === 0) {
      console.warn(`No YouTube highlights found for ${homeTeam} vs ${awayTeam}.`)
      return null
    }

    return {
      id: data.items[0]?.id?.videoId || "",
      title: data.items[0]?.snippet?.title || "No title available",
      thumbnail: data.items[0]?.snippet?.thumbnails?.high?.url || "",
    }
  } catch (error) {
    console.error("Error fetching YouTube highlights:", error)
    return null
  }
}

const Highlights = () => {
  const [highlights, setHighlights] = useState([])

  useEffect(() => {
    const loadHighlights = async () => {
      const matches = await fetchLatestMatches()
      if (matches.length === 0) {
        console.warn("No matches available to fetch highlights.")
        return
      }

      const matchHighlights = await Promise.all(
        matches.map(async (match) => {
          const homeTeam = match.teams?.home?.name || "Unknown Home Team"
          const awayTeam = match.teams?.away?.name || "Unknown Away Team"

          const highlight = await fetchYouTubeHighlights(homeTeam, awayTeam)

          return highlight
            ? {
                matchTitle: `${homeTeam} vs ${awayTeam}`,
                ...highlight,
              }
            : null
        }),
      )

      setHighlights(matchHighlights.filter((h) => h !== null).slice(0, 3))
    }

    loadHighlights()
  }, [])

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-orange-400">Latest Match Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.length === 0 ? (
            <p className="text-center text-red-500 col-span-3">No highlights available.</p>
          ) : (
            highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-orange-400/30 transition duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={highlight.thumbnail || "/placeholder.svg"}
                    alt={highlight.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={`https://www.youtube.com/watch?v=${highlight.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition duration-300"
                    >
                      <Play className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-orange-400">{highlight.matchTitle}</h3>
                  <p className="text-sm text-gray-300 line-clamp-2">{highlight.title}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Highlights

