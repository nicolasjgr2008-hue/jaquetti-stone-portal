import React from "react";

export const ScrambleText = ({ text, className = "" }: { text: string; className?: string }) => {
  return <span className={className}>{text}</span>;
};
