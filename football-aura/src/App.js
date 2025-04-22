import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LiveMatches from "./components/LiveMatches";
import Highlights from "./components/Highlights";
import Standings from "./components/Standings";
import MatchDetails from "./components/MatchDetails";
import About from "./components/About";
import Auth from "./components/Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Header setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <LiveMatches />
                  <Highlights />
                  <Standings />
                </>
              }
            />
            <Route path="/match-details/:id" element={<MatchDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
