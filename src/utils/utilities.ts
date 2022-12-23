import WallPaper1 from "../assets/images/wallpaper.jpg";
import WallPaper2 from "../assets/images/wallpaper-2.jpg";
import WallPaper3 from "../assets/images/wallpaper-3.jpg";
import WallPaper4 from "../assets/images/wallpaper-4.jpg";
import WallPaper5 from "../assets/images/wallpaper-5.jpg";
import WallPaper6 from "../assets/images/wallpaper-6.jpg";
import WallPaper7 from "../assets/images/wallpaper-7.jpg";
import WallPaper8 from "../assets/images/wallpaper-8.jpg";

export const wallpapers = [
  { path: WallPaper1, theme: "dark" },
  { path: WallPaper2, theme: "dark" },
  { path: WallPaper3, theme: "light" },
  { path: WallPaper4, theme: "light" },
  { path: WallPaper5, theme: "dark" },
  { path: WallPaper6, theme: "dark" },
  { path: WallPaper7, theme: "light" },
  { path: WallPaper8, theme: "dark" },
];

export const generateRandomNumber = (maxLimit = 10) => {
  return Math.floor(Math.random() * maxLimit);
};

export const emailRegex = new RegExp(
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
