import React, { useState, useContext } from "react";
import { Loader2 } from "lucide-react";
import { PasteContext } from "../App";
import { Button, Select, Option } from "@material-tailwind/react";
import axios from "axios";
import "../styles/material-components.css";
export function ButtonVariants() {
  const { sendPasteData } = useContext(PasteContext);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/paste",
        sendPasteData
      );
      console.log("paste created : ", response.data);
      alert(`Paste created! Link: ${response.data._id}`);
    } catch (err) {
      console.log("Error creating paste : ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <Select
        color="blue-gray"
        className="mt-footer"
        menuProps={{
          className: "mt-button !rounded-lg",
        }}
        disabled={loading}
        label="Expires in">
        <Option>Never</Option>
        <Option>1 minute</Option>
        <Option>10 minutes</Option>
        <Option>1 Day</Option>
        <Option>2 Days</Option>
        <Option>1 Week</Option>
      </Select>
      {/* <Button
        loading={loading}
        onClick={handleCreate}
        className="mt-button !min-w-[100px]">
        Create
      </Button> */}
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
  );
}
