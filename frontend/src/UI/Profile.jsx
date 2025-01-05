import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { PasteContext } from "../App";
import { Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import "../styles/material-components.css";

export function ProfileCard() {
  const { username } = useParams();
  const { loading, setLoading } = useContext(PasteContext);
  const [userData, setUserData] = useState(null);
  const [pastes, setPastes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPaste, setSelectedPaste] = useState(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageData, setImageData] = useState({
    bg: "",
    pfp: "",
  });

  const handleCopy = async () => {
    if (selectedPaste?.content?.content) {
      try {
        await navigator.clipboard.writeText(selectedPaste.content.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        setError("Failed to copy to clipboard");
      }
    }
  };

  const handleOpen = async (pasteId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/paste/${pasteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedPaste(response.data);
      setOpen(true);
    } catch (err) {
      console.error("Error fetching paste:", err.message);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Clear selected paste after animation completes
    setTimeout(() => {
      setSelectedPaste(null);
    }, 300);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/profile/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setImageData({
          bg: response.data.backgroundImage,
          pfp: response.data.backgroundImage,
        });
        // console.log(response.data);
        setUserData(response.data.user);
        setPastes(response.data.pastes);
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      setUserData(null);
      setPastes([]);
      setError(null);
      setLoading(false);
    };
  }, [username, setLoading]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const uploadedTime = selectedPaste?.createdAt
    ? formatDistanceToNow(new Date(selectedPaste.createdAt), {
        addSuffix: true,
      })
    : "";

  const expiryTime = selectedPaste?.expiration
    ? formatDistanceToNow(new Date(selectedPaste.expiration), {
        addSuffix: true,
      })
    : "Never";

  return (
    <div className="flex flex-col min-h-screen mt-bg scrollbar-thin">
      {/* Header section with profile info */}
      <div className="w-full relative mb-16">
        <div className="relative w-full">
          {/* Background Image Container */}
          <div className="absolute inset-0 w-full h-[200px] overflow-hidden bg-cover rounded-lg bg-gray-100">
            <img
              src={imageData.bg}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* This div maintains aspect ratio */}
          <div className="relative w-full h-[200px]" />

          {/* Profile Image */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ bottom: "-3rem" }}>
            <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden bg-gray-200">
              <img
                src={imageData.pfp}
                alt={username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="max-w-2xl mx-auto">
          <div className="mt-16 text-center">
            <h2 className="text-xl font-semibold mt-text">{username}</h2>
            {userData && (
              <p className="mt-1 text-sm mt-text">{userData.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* Pastes List Section */}
      <div className="flex-grow px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-medium mb-4">Pastes ({pastes.length})</h3>
          <div className="space-y-4">
            {pastes.map((paste) => (
              <div
                key={paste._id}
                className="p-4 mt-card shadow rounded-lg cursor-pointer hover:shadow-shadow-light transition-shadow"
                onClick={() => handleOpen(paste._id)}>
                <div className="flex justify-between items-center">
                  <span className="text-sm  mt-text">
                    {paste.content.title}
                  </span>
                  <span className="text-sm px-2 py-1 rounded mt-dialog-btn">
                    {paste.isPrivate ? "Private" : "Public"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Paste Dialog */}
      <Dialog open={open} handler={handleClose} className="mt-dialog" size="xl">
        <DialogHeader className="mt-dialog-header rounded-lg">
          {selectedPaste?.content?.title || "Paste Content"}
          <button
            onClick={handleCopy}
            className="p-2 ml-2 rounded-full hover:text-textPrimary-light hover:bg-gray-100 transition-colors"
            title={copied ? "Copied!" : "Copy to clipboard"}>
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </DialogHeader>
        <DialogBody
          divider
          className="h-[40vh] overflow-y-auto mt-dialog-body scrollbar-thin">
          <div className="space-y-4">
            {selectedPaste?.content?.content && (
              <pre className="whitespace-pre-wrap p-4 rounded">
                {selectedPaste.content.content}
              </pre>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between">
          {uploadedTime && (
            <div className="flex flex-col">
              <Typography className="font-normal text-left">
                Uploaded {uploadedTime}
              </Typography>
              <Typography className="font-normal text-left">
                Expires: {expiryTime}
              </Typography>
            </div>
          )}

          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1">
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
