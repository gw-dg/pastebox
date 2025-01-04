import React from "react";
import { Input, Typography, Button } from "@material-tailwind/react";
import { StickyNavbar } from "./Navbar";
import { FooterWithSocialLinks } from "./Footer";
import "../styles/material-components.css";

export default function Login() {
  return (
    <div className="flex flex-col h-screen mt-bg pt-2">
      <StickyNavbar />

      <main className="flex-1 flex justify-center items-center p-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-80 w-full max-w-4xl justify-center">
          {/* Login Section */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Typography variant="h4" className="text-center mt-text">
              Log in
            </Typography>
            <Input
              label="Username"
              className="w-full mt-input"
              color="blue-gray"
            />
            <Input
              label="Password"
              type="password"
              className="w-full mt-input"
              color="blue-gray"
            />
            <Button color="blue" size="sm" className="mt-button">
              Log in
            </Button>
          </div>

          {/* Register Section */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Typography variant="h4" className="text-center mt-text">
              Register
            </Typography>
            <Input
              label="Username"
              className="w-full mt-input"
              color="blue-gray"
            />
            <Input
              label="Email"
              type="email"
              className="w-full mt-input"
              color="blue-gray"
            />
            <Input
              label="Password"
              type="password"
              className="w-full mt-input"
              color="blue-gray"
            />
            <Input
              size="sm"
              label="Confirm Password"
              type="password"
              className="w-full mt-input"
              color="blue-gray"
            />
            <Button size="sm" className="mt-button">
              Register
            </Button>
          </div>
        </div>
      </main>

      <FooterWithSocialLinks />
    </div>
  );
}
