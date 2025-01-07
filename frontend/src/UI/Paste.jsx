import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PasteContext } from "../App";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { PasteCard } from "./PasteCard";
import "../styles/material-components.css";

export default function Paste() {
  const { id } = useParams();
  const {
    loading,
    setLoading,
    isLoggedIn,
    setLoggedIn,
    setPasteData,
    sendPasteData,
    setSendPasteData,
  } = useContext(PasteContext);

  // The useEffect hook does not support making its callback function async directly. This is because the useEffect callback expects a synchronous return value (either undefined or a cleanup function). Using an async function directly will cause it to return a Promise, which can lead to unexpected behavior.
  useEffect(() => {
    const fetchPaste = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/paste/${id}`
          );
          setPasteData(response.data);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/paste/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPasteData(response.data); // Set paste data
      } catch (err) {
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
    return () => setSendPasteData(null);
  }, [id, setLoading, setPasteData, setSendPasteData]);

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-bg">
      {loading ? (
        <Spinner className="h-12 w-12" />
      ) : (
        <PasteCard className="mt-card" />
      )}
      {/* <FooterWithSocialLinks /> */}
    </div>
  );
}
