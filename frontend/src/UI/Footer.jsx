import React, { useEffect, useState, useContext } from "react";
import { Typography, Select, Option } from "@material-tailwind/react";
import "../styles/material-components.css";
import { DarkThemeContext } from "../contexts/DarkThemeContext";

const currentYear = new Date().getFullYear();

export function FooterWithSocialLinks() {
  const { darkMode, setDarkMode } = useContext(DarkThemeContext);
  // const [value, setValue] = useState(() => {
  //   const savedDarkMode = localStorage.getItem("darkMode");
  //   return savedDarkMode
  //     ? JSON.parse(savedDarkMode)
  //       ? "Dark"
  //       : "Light"
  //     : "Light";
  // });

  // const [darkMode, setDarkMode] = useState(() => {
  //   const savedDarkMode = localStorage.getItem("darkMode");
  //   return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  // });

  // useEffect(() => {
  //   const htmlElement = document.documentElement;
  //   if (darkMode) {
  //     htmlElement.classList.add("dark");
  //   } else {
  //     htmlElement.classList.remove("dark");
  //   }
  //   // Save dark mode preference to localStorage
  //   localStorage.setItem("darkMode", JSON.stringify(darkMode));
  // }, [darkMode]);

  // useEffect(() => {
  //   setDarkMode(value === "Dark");
  // }, [value]);
  const handleThemeChange = (value) => {
    setDarkMode(value === "Dark");
  };

  return (
    <footer className="relative w-full mt-footer">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="py-4 flex w-full flex-row items-center justify-center border-t border-borderColor-dark dark:border-borderColor-light md:flex-row md:justify-between">
          <div className="flex gap-4 sm:justify-center">
            {/* Twitter Icon */}
            <Typography
              as="a"
              href="https://x.com/bhaskar__jha"
              className="opacity-80 transition-opacity hover:opacity-100 mt-footer-btn">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Typography>
            {/* GitHub Icon */}
            <Typography
              as="a"
              href="https://github.com/gw-dg"
              className="opacity-80 transition-opacity hover:opacity-100 mt-footer-btn">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </Typography>
            {/* LinkedIn Icon */}
            <Typography
              as="a"
              href="https://www.linkedin.com/in/bhaskar-jha-89226a218/"
              className="opacity-80 transition-opacity hover:opacity-100 mt-footer-btn">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                />
              </svg>
            </Typography>
          </div>
          <div className=" flex items-center justify-center">
            <Select
              label="Select Theme"
              color="blue-gray"
              className="mt-footer" // Adjusted width and height
              menuProps={{
                className: "mt-footer ", // Custom background color for the dropdown menu
              }}
              value={darkMode ? "Dark" : "Light"}
              onChange={(val) => handleThemeChange(val)}>
              <Option value="Light">Light</Option>
              <Option value="Dark">Dark</Option>
            </Select>
          </div>
        </div>
      </div>
    </footer>
  );
}
