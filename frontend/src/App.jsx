import React, { useState, useEffect } from "react";
import "./App.css";

import { ThemeProvider } from "@material-tailwind/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./UI/Login";
import { ProfileCard } from "./UI/Profile";
import Paste from "./UI/Paste";
import axios from "axios";
import { DarkThemeProvider } from "./contexts/DarkThemeContext";

export const PasteContext = React.createContext();
function App() {
  const [pasteData, setPasteData] = useState({});
  const [sendPasteData, setSendPasteData] = useState({
    content: {
      title: "",
      content: "",
    },
    expiration: null,
    isPrivate: false,
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   window.addEventListener("popstate", () => {
  //     document.getElementsByTagName("textarea")[0].value = "";
  //   });
  // }, []);

  const setToken = (newToken) => {
    setUserToken(newToken);
  };

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setLoggedIn(false);
        return;
      }

      try {
        // Add an endpoint in your backend to validate token
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/validate`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setLoggedIn(true);
        setToken(storedToken);
      } catch (error) {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setToken(null);
      }
    };

    validateToken();
  }, []);

  return (
    <DarkThemeProvider>
      <PasteContext.Provider
        value={{
          pasteData,
          setPasteData,
          sendPasteData,
          setSendPasteData,
          loading,
          setLoading,
          isLoggedIn,
          setLoggedIn,
        }}>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/login"
                element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
              />
              <Route path="/profile/:username" element={<ProfileCard />} />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <Navigate
                      to={`/profile/${localStorage.getItem("username")}`}
                      replace
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route path="/paste/:id" element={<Paste />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </PasteContext.Provider>
    </DarkThemeProvider>
  );
}

export default App;
