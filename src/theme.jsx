import React, { useEffect, useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <FontAwesomeIcon
        className="absolute top-12 right-8 text-[calc(1rem+1.5dvw)] cursor-pointer"
        icon={theme === "light" ? faMoon : faSun}
        onClick={toggleTheme}
      />
    </>
  );
}

export default Theme;
