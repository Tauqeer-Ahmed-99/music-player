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
  Business = "business",
}

const ThemeContext = createContext({
  theme: Theme.Business,
  changeTheme: (theme: Theme) => {},
});

export default ThemeContext;
