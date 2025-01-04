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
export const PasteContext = React.createContext();
function App() {
  const [pasteData, setPasteData] = useState({});
  const [sendPasteData, setSendPasteData] = useState({
    content: {
      title: "",
      content: "",
    },
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   window.addEventListener("popstate", () => {
  //     document.getElementsByTagName("textarea")[0].value = "";
  //   });
  // }, []);
  return (
    <>
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
              <Route path="/paste/:id" element={<Paste />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>

          {/* <div className="p-4">
          <ProfileCard
            name="Emma Roberts"
            title="UI/UX Designer"
            company="Company"
            profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZCvchzFy3m4ISz6qJASrs-O9iKJpu3mgm_Q&s"
            backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZCvchzFy3m4ISz6qJASrs-O9iKJpu3mgm_Q&s"
          />
        </div> */}
        </ThemeProvider>
      </PasteContext.Provider>
    </>
  );
}

export default App;
