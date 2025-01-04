import React, { useEffect, useState, useContext } from "react";
import { PasteContext } from "../App";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import "../styles/material-components.css";

export function PasteCard() {
  const { pasteData } = useContext(PasteContext);
  if (!pasteData) {
    return <div>Paste Not Found</div>;
  }

  return (
    <Card className="max-w-[24rem] overflow-hidden mt-card">
      <CardBody>
        <Typography variant="h4">{pasteData.content.title}</Typography>
        <Typography variant="lead" className="mt-3 font-normal ">
          {pasteData.content.content}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between mt-card-footer">
        <Typography className="font-normal">{pasteData.createdAt}</Typography>
      </CardFooter>
    </Card>
  );
}
