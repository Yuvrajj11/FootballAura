"use client"
import { motion } from "framer-motion"

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-full w-full object-cover md:w-48" src="./images/blacknwhite.jpg" alt="Profile" />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">About Me</div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-white">Yuvraj Kamble</h2>
            <p className="mt-2 text-gray-300">
              Football has always been more than just a game for me—it's a passion that brings people together. With Football Aura, I aim to create a platform where fans can experience the excitement of live matches, explore in-depth team stats, and enjoy match highlights, all in one place. This project is a blend of my love for football and my skills in web development, designed to deliver real-time updates in the most engaging way possible.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default About

