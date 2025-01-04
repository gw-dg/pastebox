import { Input, Textarea } from "@material-tailwind/react";
import React, { useContext } from "react";
import { PasteContext } from "../App";
import "../styles/material-components.css";
export function InputColors() {
  const { sendPasteData, setSendPasteData } = useContext(PasteContext);

  const handleTitleChange = (e) => {
    setSendPasteData((prev) => ({
      content: {
        title: e.target.value,
        content: prev.content.content,
      },
    }));
  };

  const handleContentChange = (e) => {
    setSendPasteData((prev) => ({
      content: {
        title: prev.content.title,
        content: e.target.value,
      },
    }));
  };

  return (
    <div className="flex w-[60rem] flex-col gap-3">
      <Input
        value={sendPasteData.content.title}
        color="blue-gray"
        label="Title"
        className="w-[60rem] h-[3rem] mt-input"
        onChange={(e) => {
          handleTitleChange(e);
        }}
      />
      <Textarea
        label="Content"
        value={sendPasteData.content.content}
        color="blue-gray"
        onChange={(e) => {
          // const textarea = e.target;
          // textarea.style.height = "auto"; // Reset height
          // textarea.style.height = `${textarea.scrollHeight}px`; // Adjust to content
          handleContentChange(e); // Update state
        }}
        className="resize-auto w-[60rem] !h-80 mt-input overflow-y-auto"
      />
    </div>
  );
}
