import { useState } from "react";
import { StickyNavbar } from "./UI/Navbar";
import { ThemeProvider } from "@material-tailwind/react";
import "./App.css";
import { InputColors } from "./UI/Input";
import { FooterWithSocialLinks } from "./UI/Footer";
import { ProfileCard } from "./UI/Profile";
import { ButtonVariants } from "./UI/Button";

function App() {
  return (
    <>
      <ThemeProvider>
        <div className="flex flex-col pt-3 bg-gradient-to-r from-gray-100 to-gray-300 justify-between h-screen">
          {/* Navbar at the top */}
          <StickyNavbar />

          {/* Centered InputColors */}
          <div className="flex flex-col gap-2 justify-center items-center flex-grow">
            <InputColors />
            <ButtonVariants />
          </div>

          {/* Footer at the bottom */}
          <FooterWithSocialLinks />
        </div>

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
    </>
  );
}

export default App;
