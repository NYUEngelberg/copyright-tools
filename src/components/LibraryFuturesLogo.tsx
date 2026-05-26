import React from "react";
import logo from "../LIbraryFutures_CMYK.svg";

export function LibraryFuturesLogo() {
  return (
    <div className="flex items-center flex-shrink-0 select-none">
      <img
        src={logo}
        alt="Library Futures Logo"
        className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>
  );
}
