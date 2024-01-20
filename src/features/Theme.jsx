import React, { useEffect } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import ToolTipComp from "../components/toolTip";
import useTodo from "../store";

function Theme() {
  const { setTheme, theme } = useTodo((state) => state);
  const iconClassName =
    "absolute top-12 right-8 w-[calc(1.5rem+1dvw)] h-[calc(1.5rem+1dvw)] cursor-pointer";

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
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
