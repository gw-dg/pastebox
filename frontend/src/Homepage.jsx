import React, { useEffect, useContext } from "react";
import { InputColors } from "./UI/Input";
import { FooterWithSocialLinks } from "./UI/Footer";
import { ButtonVariants } from "./UI/Button";
import { StickyNavbar } from "./UI/Navbar";
import { PasteContext } from "./App";
import { IconButton } from "@material-tailwind/react";
import "./styles/material-components.css";
export default function Homepage() {
  const { setSendPasteData } = useContext(PasteContext);

  useEffect(() => {
    // Reset sendPasteData when the homepage mounts
    setSendPasteData({
      content: {
        title: "",
        content: "",
      },
    });
  }, [setSendPasteData]);

  return (
    <>
      <div className="flex flex-col pt-3 justify-between h-screen mt-bg">
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
    </>
  );
}
