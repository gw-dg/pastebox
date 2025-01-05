import { Input, Textarea } from "@material-tailwind/react";
import React, { useContext } from "react";
import { PasteContext } from "../App";
import "../styles/material-components.css";
export function InputBox() {
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
    <div className="flex flex-col gap-3 w-full max-w-[60rem]">
      <Textarea
        value={sendPasteData.content.title}
        color="blue-gray"
        placeholder="Enter Title Here..."
        className="w-full max-w-[60rem] !min-h-[1rem] mt-input "
        onChange={(e) => handleTitleChange(e)}
        labelProps={{
          className: "hidden",
        }}
      />
      <Textarea
        value={sendPasteData.content.content}
        color="blue-gray"
        placeholder="Enter Content Here..."
        onChange={(e) => {
          handleContentChange(e); // Update state
        }}
        className="resize-auto w-full max-w-[60rem] min-h-[20rem] h-auto mt-input overflow-y-auto scrollbar-thin"
        labelProps={{
          className: "hidden",
        }}
      />
    </div>
  );
}
