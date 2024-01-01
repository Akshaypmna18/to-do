import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import ToolTipComp from "../components/toolTip";

function Theme() {
  const iconClassName = `absolute top-12 right-8 w-[calc(1.5rem+1dvw)] h-[calc(1.5rem+1dvw)] cursor-pointer`;

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

  const Content = () => <p>Click to toggle theme</p>;

  return (
    <>
      <ToolTipComp Content={() => <Content />}>
        {theme === "light" ? (
          <MoonIcon className={iconClassName} onClick={toggleTheme} />
        ) : (
          <SunIcon className={iconClassName} onClick={toggleTheme} />
        )}
      </ToolTipComp>
    </>
  );
}

export default Theme;
