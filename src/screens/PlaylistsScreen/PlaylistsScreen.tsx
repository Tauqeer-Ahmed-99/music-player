import React, { useContext } from "react";

import PlaylistIcon from "../../assets/svg/playlists.svg";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";

import MenuIcon from "../../assets/svg/menu.svg";

const PlaylistsScreen = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <div>
      <div className="flex items-center px-4 mb-4 ml-4 md:mb-8">
        <img
          src={PlaylistIcon}
          alt="Playlist Icon"
          className={`${
            themeContext.theme === "business" ? "h-6 invert mr-4" : "h-6 mr-4"
          }`}
        />
        <span className="font-medium">Available Playlists</span>
      </div>
      {[...new Array(5)].map((playlist, idx) => (
        <PlaylistItem name={"Playlist " + (idx + 1)} />
      ))}
    </div>
  );
};

export default PlaylistsScreen;

const PlaylistItem = ({ name }: { name: string }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      className={`flex items-center btn btn-ghost h-12 justify-between my-2 px-8 rounded-md hover:cursor-pointer`}
    >
      <div className="flex items-center">
        <img
          src={PlaylistIcon}
          alt="Playlist Icon"
          className={`${
            themeContext.theme === Theme.Business
              ? "h-6 invert mr-4"
              : "h-6 mr-4"
          }`}
        />
        <span className="text-lg font-medium">{name}</span>
      </div>
      <button className="btn btn-ghost btn-circle btn-sm">
        <img
          src={MenuIcon}
          alt="Menu"
          className={`h-4 rotate-90 ${
            themeContext.theme === "business" ? "invert" : ""
          }`}
        />
      </button>
    </div>
  );
};
