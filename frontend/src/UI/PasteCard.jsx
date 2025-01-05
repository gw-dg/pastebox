import React, { useEffect, useState, useContext } from "react";
import { PasteContext } from "../App";
import { formatDistanceToNow } from "date-fns";
import { Copy, Check } from "lucide-react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import "../styles/material-components.css";

export function PasteCard() {
  const { pasteData } = useContext(PasteContext);
  const [copied, setCopied] = useState(false);
  if (!pasteData || !pasteData.content) {
    return <div>Loading paste data...</div>;
  }

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
  const uploadedTime = formatDistanceToNow(new Date(pasteData.createdAt), {
    addSuffix: true,
  });

  let expiryTime = "Never";

  if (pasteData.expiration) {
    expiryTime = formatDistanceToNow(new Date(pasteData.expiration), {
      addSuffix: false, // Adds "ago" or "in" to the output
    });
  }

  return (
    <Card className="max-w-[90vw] w-full max-h-[80vh] mt-card">
      <CardBody className="overflow-y-auto scrollbar-thin">
        <Typography variant="h4">{pasteData.content.title}</Typography>
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
        <Typography
          variant="lead"
          className="mt-3 font-normal whitespace-pre-wrap">
          {pasteData.content.content}
        </Typography>
      </CardBody>
      <CardFooter className="flex flex-col items-end justify-between mt-card rounded-lg p-2">
        <Typography className="font-normal text-right">
          Uploaded {uploadedTime}
        </Typography>
        <Typography className="font-normal text-right">
          Expires in: {expiryTime}
        </Typography>
      </CardFooter>
    </Card>
  );
}
