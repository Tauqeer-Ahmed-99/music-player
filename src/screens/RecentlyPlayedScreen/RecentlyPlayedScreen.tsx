import React, { useContext } from "react";
import MusicTable from "../../components/MusicTable/MusicTable";

import RecentlyPlayed from "../../assets/svg/recently-played.svg";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";

const RecentlyPlayedScreen = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <div className="flex items-center mb-4 ml-4 md:mb-8">
        <img
          src={RecentlyPlayed}
          alt="Create Playlist Icon"
          className={`${
            themeContext.theme === Theme.Business
              ? "h-6 invert mr-4"
              : "h-6 mr-4"
          }`}
        />
        <span className="font-medium">Recently Played</span>
      </div>
      <MusicTable onRecentlyPlayedScreen />
    </>
  );
};

export default RecentlyPlayedScreen;
