import { Textarea } from "@material-tailwind/react";
import React, { useState } from "react";

export function TextArea() {
  const [value, setValue] = useState("");

  return <div className="flex flex-col gap-4 w-96 max-w-md mx-auto"></div>;
}
