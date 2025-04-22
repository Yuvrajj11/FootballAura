import { Instagram } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium">&copy; 2025 Football Aura | All rights reserved</p>
            <p className="text-xs text-gray-400 mt-1">Bringing the passion of football to your screen</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/yuvrajjjj._?igsh=NXhtbGJzY2E4a3pu&utm_source=qr" className="text-gray-400 hover:text-orange-400 transition duration-300">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer