import { Input } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
export function InputColors() {
  const [value, setValue] = useState("");
  return (
    <div className="flex w-[30rem] flex-col gap-2">
      <Input color="blue" label="Title" className="w-[30rem]" />
      <Textarea
        label="Content"
        value={value}
        color="blue"
        onChange={(e) => {
          const textarea = e.target;
          textarea.style.height = "auto"; // Reset height
          textarea.style.height = `${textarea.scrollHeight}px`; // Adjust to content
          setValue(e.target.value); // Update state
        }}
        rows={1} // Minimum rows
        className="resize-auto w-[30rem] overflow-y-auto"
      />
    </div>
  );
}
