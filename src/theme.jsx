import React, { useEffect, useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function Theme() {
  const getTheme = () => {
    let savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  };

  const [theme, setTheme] = useState(getTheme());

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <FontAwesomeIcon
              className="absolute top-12 right-8 text-[calc(1rem+1.5dvw)] cursor-pointer"
              icon={theme === "light" ? faMoon : faSun}
              onClick={toggleTheme}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to toggle theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

export default Theme;
