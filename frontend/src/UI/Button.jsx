import React, { useState, useContext } from "react";
import { Loader2 } from "lucide-react";
import { PasteContext } from "../App";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Select,
  Option,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import "../styles/material-components.css";
export function ButtonVariants() {
  const navigate = useNavigate();
  const { sendPasteData, setSendPasteData, isLoggedIn } =
    useContext(PasteContext);
  const [loading, setLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreate = async (e) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/paste`,
        sendPasteData
      );
      console.log("paste created : ", response.data);
      navigate(`/paste/${response.data._id}`);
      // alert(`Paste created! Link: ${response.data._id}`);
    } catch (err) {
      console.log("Error creating paste : ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExpirationChange = (value) => {
    let expirationDate = null;

    if (value !== "never") {
      const now = new Date();
      switch (value) {
        case "1-minute":
          expirationDate = new Date(now.getTime() + 1 * 60 * 1000); // 1 minute
          break;
        case "10-minutes":
          expirationDate = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes
          break;
        case "1-hour":
          expirationDate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour
          break;
        case "1-day":
          expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day
          break;
        case "1-week":
          expirationDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week
          break;
        default:
          expirationDate = null;
      }
    }

    setSendPasteData((prev) => ({
      ...prev,
      expiration: expirationDate,
      isPrivate: isPrivate,
    }));
  };

  return (
    <div className="flex gap-4 w-full max-w-[60rem] justify-between items-center">
      {isLoggedIn && (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            containerProps={{
              className: "p-0", // Remove padding to reduce size
            }}
            className="h-4 w-4" // Reduce checkbox size
          />
          <Typography color="mt-text" className="font-medium text-sm">
            Private
          </Typography>
        </div>
      )}
      <div>
        <Select
          color="light-blue"
          className="mt-footer"
          label="Expires in" // Use label for accessibility
          menuProps={{
            className: "!rounded-lg",
          }}
          disabled={loading}
          onChange={(value) => handleExpirationChange(value)}>
          <Option value="never">Never</Option>
          <Option value="1-minute">1 minute</Option>
          <Option value="10-minutes">10 minutes</Option>
          <Option value="1-day">1 Day</Option>
          <Option value="2-days">2 Days</Option>
          <Option value="1-week">1 Week</Option>
        </Select>
      </div>
      {/* <Button
        loading={loading}
        onClick={handleCreate}
        className="mt-button !min-w-[100px]">
        Create
      </Button> */}

      <div>
        <Button
          onClick={handleCreate}
          disabled={loading}
          className="mt-button px-6 py-2 min-h-[40px] min-w-[100px] flex items-center justify-center gap-2">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
}
