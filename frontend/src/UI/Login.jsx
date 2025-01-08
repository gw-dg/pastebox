import React, { useState, useContext } from "react";
import axios from "axios";
import { Input, Typography, Button, Navbar } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { FooterWithSocialLinks } from "./Footer";
import { PasteContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";

import "../styles/material-components.css";

export default function Login() {
  const {
    loading = false,
    setLoading,
    isLoggedIn,
    setLoggedIn,
  } = useContext(PasteContext);
  const [loginPasswordShown, setLoginPasswordShown] = useState(false);
  const [registerPasswordShown, setRegisterPasswordShown] = useState(false);
  const [formData, setFormData] = useState({
    login: {
      username: "",
      password: "",
    },
    register: {
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleInputChange = (formType, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [formType]: {
        ...prev[formType],
        [field]: value,
      },
    }));
  };

  const handleLogin = async () => {
    if (!formData.login.username || !formData.login.password) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoggedIn(false);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        formData.login,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { token } = response.data; // Extract token from response
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", formData.login.username);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("Login successful!");
        setLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed", err.response?.data || err.message);
      alert(err.response?.data?.error || "Something went wrong during login!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (
      !formData.register.username ||
      !formData.register.email ||
      !formData.register.password
    ) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoggedIn(false);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        formData.register,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", formData.register.username);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("User Created");
        setLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      console.error("Registration Failed", err.response?.data || err.message);
      alert(
        err.response?.data?.error || "Something went wrong during registration!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen mt-bg pt-2">
      <Navbar className="inline mx-auto max-w-screen-xl mt-navbar  px-4 py-3 ">
        <div className="flex items-center justify-between">
          {/* <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium">
            The Last Note
          </Typography> */}
          <Typography href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Typography>
        </div>
      </Navbar>

      <main className="flex-1 flex justify-center items-center p-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-80 w-full max-w-4xl justify-center">
          {/* Login Section */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Typography variant="h4" className="mb-4 text-center mt-text">
              Log in
            </Typography>
            <div>
              <Typography
                variant="small"
                className="mb-2 block font-medium mt-text">
                Your Username
              </Typography>
              <Input
                className="w-full mt-input rounded-full placeholder:opacity-100 focus:border-t-primary"
                color="blue-gray"
                placeholder="John Doe"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e) =>
                  handleInputChange("login", "username", e.target.value)
                }
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 block font-medium mt-text">
                Password
              </Typography>
              <Input
                type={loginPasswordShown ? "text" : "password"}
                className="w-full mt-input mt-typography rounded-full placeholder:opacity-100 focus:border-t-primary"
                color="blue-gray"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e) =>
                  handleInputChange("login", "password", e.target.value)
                }
                icon={
                  <i onClick={() => setLoginPasswordShown(!loginPasswordShown)}>
                    {loginPasswordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
              />
            </div>
            <Button
              color="gray"
              className="mt-4 mt-button h-12 rounded-full"
              onClick={(e) => handleLogin(e)}
              disabled={loading}>
              Log in
            </Button>
            {/* <Typography
              variant="small"
              color="gray"
              className="text-center font-normal">
              Forgot password?{" "}
              <a href="#" className="font-medium mt-text">
                Reset here
              </a>
            </Typography> */}
          </div>

          {/* Register Section */}
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Typography variant="h4" className="mb-2 text-center mt-text">
              Register
            </Typography>
            <div>
              <Typography
                variant="small"
                className="mb-2 block font-medium mt-text">
                Username
              </Typography>
              <Input
                className="w-full mt-input mt-typography rounded-full placeholder:opacity-100 focus:border-t-primary"
                color="blue-gray"
                placeholder="John Doe"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e) =>
                  handleInputChange("register", "username", e.target.value)
                }
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 block font-medium mt-text">
                Email
              </Typography>
              <Input
                type="email"
                className="w-full mt-input mt-typography rounded-full placeholder:opacity-100 focus:border-t-primary"
                color="blue-gray"
                placeholder="name@mail.com"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e) =>
                  handleInputChange("register", "email", e.target.value)
                }
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 block font-medium mt-text">
                Password
              </Typography>
              <Input
                type={registerPasswordShown ? "text" : "password"}
                className="w-full mt-input mt-typography rounded-full placeholder:opacity-100 focus:border-t-primary"
                color="blue-gray"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e) =>
                  handleInputChange("register", "password", e.target.value)
                }
                icon={
                  <i
                    onClick={() =>
                      setRegisterPasswordShown(!registerPasswordShown)
                    }>
                    {registerPasswordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
              />
            </div>
            <Button
              color="gray"
              className="mt-4 mt-button h-12 rounded-full"
              onClick={(e) => handleRegister(e)}>
              Register
            </Button>
          </div>
        </div>
      </main>

      <FooterWithSocialLinks />
    </div>
  );
}
