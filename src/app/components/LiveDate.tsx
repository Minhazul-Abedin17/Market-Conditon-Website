"use client";
import { useEffect, useState } from "react";
const LiveDate = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <p className="text-[10px] font-semibold text-[#1D271F] sm:text-xs">
      {date || "\u00A0"}
    </p>
  );
};

export default LiveDate;
