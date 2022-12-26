import React, { useContext, useState } from "react";

import MusicIcon from "../../assets/svg/music.svg";
import EyeIcon from "../../assets/svg/eye.svg";
import HistoryIcon from "../../assets/svg/clock.svg";
import PlayIcon from "../../assets/svg/play.svg";
import MusicDisc from "../../assets/images/music-disc.png";
import ShareIcon from "../../assets/svg/share.svg";
import UploadIcon from "../../assets/svg/upload.svg";
import MenuIcon from "../../assets/svg/menu.svg";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";
import { IAudioFile, IPlaylist } from "../../context/MusicContext/musicTypes";
import MusicContext from "../../context/MusicContext/MusicContext";

const MusicTable = ({
  onRecentlyPlayedScreen,
  onHomeScreen,
  audioFiles,
  playlist,
}: {
  onHomeScreen?: boolean;
  onRecentlyPlayedScreen?: boolean;
  audioFiles: IAudioFile[];
  playlist?: IPlaylist;
}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      className={`w-full ${
        onRecentlyPlayedScreen ? "h-full" : "h-[66.66%] md:h-1/2"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-center w-full h-12">
        <span className="p-1 w-[10%]"></span>
        <span className="p-1 w-[40%]">Title</span>
        <span className="p-1 w-[23.333%] lg:w-[20%] flex items-center justify-center">
          <img
            src={MusicIcon}
            alt="Composer"
            className={`h-4 ${
              themeContext.theme === Theme.Business ? "invert" : ""
            }`}
          />
        </span>
        <span className="p-1 w-[13.333%] lg:w-[10%] flex items-center justify-center">
          <img
            src={EyeIcon}
            alt="Views"
            className={`h-5 ${
              themeContext.theme === Theme.Business ? "invert" : ""
            }`}
          />
        </span>
        <span className="p-1 w-[13.3%] lg:w-[10%] flex items-center justify-center">
          <img
            src={HistoryIcon}
            alt="Time"
            className={`h-4 ${
              themeContext.theme === Theme.Business ? "invert" : ""
            }`}
          />
        </span>
        <span className="p-1 w-[3.333%] hidden lg:flex"></span>
        <span className="p-1 w-[3.333%] hidden lg:flex"></span>
        <span className="p-1 w-[3.3%] hidden lg:flex"></span>
      </div>
      {/* Rows */}
      <div className="h-[calc(100%-3rem)] overflow-x-auto no-scrollbar pb-16">
        {audioFiles.map((audioFile, index) => (
          <MusicRow
            key={audioFile.id + index}
            audioFile={audioFile}
            onHomeScreen={onHomeScreen}
            onRecentlyPlayedScreen={onRecentlyPlayedScreen}
            playlist={playlist}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicTable;

const MusicRow = ({
  audioFile,
  onHomeScreen,
  onRecentlyPlayedScreen,
  playlist,
}: {
  audioFile: IAudioFile;
  onHomeScreen?: boolean;
  onRecentlyPlayedScreen?: boolean;
  playlist?: IPlaylist;
}) => {
  const [isPlaylistSelectionOpen, setIsPlaylistSelectionOpen] = useState(false);
  const themeContext = useContext(ThemeContext);

  const musicContext = useContext(MusicContext);

  const handleMusicRowClick = () => {
    const recentlyPlayed = musicContext.recentlyPlayed?.audioFiles;
    let lastRecent;
    if (recentlyPlayed && recentlyPlayed.length > 0) {
      lastRecent = recentlyPlayed[recentlyPlayed.length - 1];
      if (lastRecent.fileName !== audioFile.fileName) {
        musicContext.addToRecentlyPlayed(audioFile);
      }
    } else {
      musicContext.addToRecentlyPlayed(audioFile);
    }
  };

  const handleAddToPlaylistClick = (playlist: IPlaylist) => {
    musicContext.addToPlaylist(playlist, audioFile);
    setIsPlaylistSelectionOpen(false);
  };

  const handleRemoveFromPlaylistClick = (
    playlist: IPlaylist,
    audioFile: IAudioFile
  ) => {
    musicContext.removeFromPlaylist(playlist, audioFile);
  };

  return (
    <div
      className="flex items-center justify-center w-full h-20 my-2 btn-ghost group hover:cursor-pointer hover:rounded-md"
      onClick={handleMusicRowClick}
    >
      <span className="p-1 w-[10%] flex items-center justify-center">
        <button className="btn btn-ghost btn-sm lg:btn-md btn-circle">
          <img
            src={PlayIcon}
            className={`h-4 ${
              themeContext.theme === Theme.Business ? "invert" : ""
            }`}
            alt="Play"
          />
        </button>
      </span>
      <span className="p-1 w-[40%] flex items-center">
        <img
          src={MusicDisc}
          alt="Album"
          className={`hidden w-16 h-16 mr-2 md:flex ${
            themeContext.theme === Theme.Business ? "invert" : ""
          }`}
        />
        <div className="flex flex-col items-start w-[90%] truncate">
          <span className="font-medium">{audioFile.fileName}</span>
          <span className="text-xs">{audioFile.composerName ?? "Unknown"}</span>
        </div>
      </span>
      <span className="p-1 w-[23.333%] lg:w-[20%] flex items-center justify-center text-xs truncate">
        {audioFile.composerName ?? "Unknown"}
      </span>
      <span className="p-1 w-[13.333%] lg:w-[10%] flex items-center justify-center text-xs truncate">
        -
      </span>
      <span className="p-1 w-[13.3%] lg:w-[10%] flex items-center justify-center text-xs truncate">
        -
      </span>
      <span className="p-1 w-[3.333%] hidden lg:flex">
        <button className="btn btn-sm btn-circle btn-ghost">
          <img
            src={ShareIcon}
            alt="Share"
            className={`h-4 ${
              themeContext.theme === Theme.Business ? "invert" : ""
            }`}
          />
        </button>
      </span>
      <span className="p-1 w-[3.333%] hidden lg:flex">
        <button className="btn btn-sm btn-circle btn-ghost">
          <img
            src={UploadIcon}
            alt="Upload"
            className={`h-4 ${
              themeContext.theme === Theme.Business ? "invert" : ""
            }`}
          />
        </button>
      </span>
      <span className="p-1 w-[3.3%] hidden lg:flex dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-circle btn-ghost">
          <img
            src={MenuIcon}
            alt="Menu"
            className={`h-4 rotate-90 ${
              themeContext.theme === Theme.Business ? "invert" : ""
            }`}
          />
        </label>
        <ul
          tabIndex={0}
          className="p-2 mt-8 shadow dropdown-content menu bg-base-100 rounded-box w-52"
        >
          <li
            onClick={() =>
              setIsPlaylistSelectionOpen((prevState) => !prevState)
            }
            // onBlur={() => setIsPlaylistSelectionOpen(false)}
          >
            <span tabIndex={1} className="dropdown dropdown-end">
              <span>Add to playlist</span>
              {isPlaylistSelectionOpen && (
                <ul
                  tabIndex={1}
                  className="p-2 mt-8 shadow mr-52 dropdown-content menu bg-base-100 rounded-box w-52"
                >
                  {" "}
                  {(musicContext.playlists === null ||
                    musicContext.playlists.length === 0) && (
                    <div className="p-2">No Playlist available.</div>
                  )}
                  {musicContext.playlists?.map((playlist, index) => (
                    <li key={playlist.id + index}>
                      <span onClick={() => handleAddToPlaylistClick(playlist)}>
                        {playlist.playlistName}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </span>
          </li>
          {!onHomeScreen && playlist && (
            <li
              onClick={() =>
                handleRemoveFromPlaylistClick(playlist as IPlaylist, audioFile)
              }
            >
              <span>Remove</span>
            </li>
          )}
        </ul>
      </span>
    </div>
  );
};
