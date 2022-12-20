import { createContext } from "react";

export enum Theme {
  Light = "light",
  Dark = "dark",
  Cupcake = "cupcake",
  BumbleBee = "bumblebee",
  Emerald = "emerald",
  Corporate = "corporate",
  Synthwave = "synthwave",
  Winter = "winter",
}

const ThemeContext = createContext({
  theme: Theme.Dark,
  changeTheme: (theme: Theme) => {},
});

export default ThemeContext;
