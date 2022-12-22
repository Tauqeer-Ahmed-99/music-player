import React, { useContext } from "react";

import PlaylistIcon from "../../assets/svg/playlists.svg";
import ThemeContext from "../../context/ThemeContext/ThemeContext";

const PlaylistsScreen = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <div>
      <div className="flex items-center mb-8">
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
      className={`flex items-center p-4 rounded-md hover:cursor-pointer ${
        themeContext.theme === "business"
          ? "hover:bg-gray-800"
          : "hover:bg-slate-300"
      }  `}
    >
      <img
        src={PlaylistIcon}
        alt="Playlist Icon"
        className={`${
          themeContext.theme === "business" ? "h-12 invert mr-4" : "h-12 mr-4"
        }`}
      />
      <span className="text-xl font-medium">{name}</span>
    </div>
  );
};
