import React, { useContext } from "react";
import {
  IconButton,
  Navbar,
  Collapse,
  Typography,
  Button,
  Switch,
} from "@material-tailwind/react";
import { PasteContext } from "../App";
import "../styles/material-components.css";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { isLoggedIn } = useContext(PasteContext);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <IconButton size="md" className="mt-navbar-btn">
        <i className="fas fa-user hover:animate-bounce" />
      </IconButton>
    </ul>
  );

  const navCollapseList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Button size="md" className="mt-navbar-btn rounded-sm">
        Profile
      </Button>
    </ul>
  );
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
          {isLoggedIn && <div className="mr-4 hidden lg:block">{navList}</div>}
          <div className="flex items-center gap-x-1">
            <Button size="sm" className="hidden lg:inline-block mt-navbar-btn">
              <span>Log In</span>
            </Button>
            <Button size="sm" className="hidden lg:inline-block mt-navbar-btn">
              <span>Sign Up</span>
            </Button>
          </div>
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
        {isLoggedIn && navCollapseList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth size="sm" className="mt-navbar-btn">
            <span>Log In</span>
          </Button>
          <Button fullWidth size="sm" className="mt-navbar-btn">
            <span>Sign Up</span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
