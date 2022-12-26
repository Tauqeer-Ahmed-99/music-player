import React, { useEffect, useState } from "react";
import ThemeContext, { Theme } from "./ThemeContext";

const ThemeProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [theme, setTheme] = useState<Theme>(Theme.Business);

  const changeTheme = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem("theme", JSON.stringify(theme));
  };

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem("theme");
    if (themeFromLocalStorage) {
      setTheme(themeFromLocalStorage as Theme);
    }
  }, []);

  const context = {
    theme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={context}>
      <div className="w-screen h-screen overflow-auto" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
