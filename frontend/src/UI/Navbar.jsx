import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Navbar,
  Collapse,
  Typography,
  Button,
} from "@material-tailwind/react";
import { PasteContext } from "../App";
import "../styles/material-components.css";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { isLoggedIn, setLoggedIn } = useContext(PasteContext);

  const navigate = useNavigate();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleProfile = () => {
    navigate("/profile");
  };
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <IconButton
        size="md"
        className="mt-navbar-btn"
        onClick={() => handleProfile()}>
        <i className="fas fa-user hover:animate-bounce" />
      </IconButton>
    </ul>
  );

  const navCollapseList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Button
        size="md"
        className="mt-navbar-btn rounded-sm"
        onClick={() => handleProfile()}>
        Profile
      </Button>
    </ul>
  );

  const handleLogout = (e) => {
    // console.log("clicked logout");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    delete axios.defaults.headers.common["Authorization"];
    setLoggedIn(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar className="inline mx-auto max-w-screen-xl mt-navbar  px-4 py-3 ">
      <div className="flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium">
          The Last Note
        </Typography>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="mr-4 hidden lg:block">{navList}</div>
              <Button
                size="sm"
                className="hidden lg:inline-block mt-navbar-btn"
                onClick={(e) => handleLogout(e)}>
                <span>Log Out</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-x-1">
              <Button
                size="sm"
                className="hidden lg:inline-block mt-navbar-btn"
                onClick={() => handleLogin()}>
                <span>Log In</span>
              </Button>
              <Button
                size="sm"
                className="hidden lg:inline-block mt-navbar-btn"
                onClick={() => handleLogin()}>
                <span>Sign Up</span>
              </Button>
            </div>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="flex items-center gap-x-1">
          {isLoggedIn ? (
            <>
              {navCollapseList}
              <Button
                fullWidth
                size="sm"
                className="mt-navbar-btn"
                onClick={(e) => handleLogout(e)}>
                <span>Log Out</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                fullWidth
                size="sm"
                className="mt-navbar-btn"
                onClick={() => handleLogin()}>
                <span>Log In</span>
              </Button>
              <Button
                fullWidth
                size="sm"
                className="mt-navbar-btn"
                onClick={() => handleLogin()}>
                <span>Sign Up</span>
              </Button>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
