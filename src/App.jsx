import React, { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("light");
  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  // min-[1200px]:w-[80dvh]

  return (
    <div className="min-h-[100dvh] bg-white dark:bg-[#222] flex justify-center items-center"></div>
  );
}

export default App;
