import React, { useContext } from "react";
import MusicTable from "../../components/MusicTable/MusicTable";

import RecentlyPlayed from "../../assets/svg/recently-played.svg";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";
import MusicContext from "../../context/MusicContext/MusicContext";
import { IAudioFile } from "../../context/MusicContext/musicTypes";

const RecentlyPlayedScreen = () => {
  const themeContext = useContext(ThemeContext);

  const musicContext = useContext(MusicContext);

  return (
    <>
      <div className="flex items-center px-4 mb-4 ml-4 md:mb-8">
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

      {musicContext?.recentlyPlayed &&
        musicContext?.recentlyPlayed?.audioFiles && (
          <MusicTable
            onRecentlyPlayedScreen
            audioFiles={
              musicContext?.recentlyPlayed?.audioFiles as IAudioFile[]
            }
          />
        )}
    </>
  );
};

export default RecentlyPlayedScreen;
