import React, { useContext } from "react";

import MusicIcon from "../../assets/svg/music.svg";
import EyeIcon from "../../assets/svg/eye.svg";
import HistoryIcon from "../../assets/svg/clock.svg";
import PlayIcon from "../../assets/svg/play.svg";
import MusicDisc from "../../assets/images/music-disc.png";
import ShareIcon from "../../assets/svg/share.svg";
import UploadIcon from "../../assets/svg/upload.svg";
import MenuIcon from "../../assets/svg/menu.svg";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";

const MusicTable = ({
  onRecentlyPlayedScreen,
}: {
  onRecentlyPlayedScreen?: boolean;
}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      className={`w-full ${
        onRecentlyPlayedScreen ? "h-full" : "h-[66.66%] md:h-1/2"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-center w-full h-12 px-4">
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
        {[...new Array(20)].map((music, index) => (
          <MusicRow key={index} />
        ))}
      </div>
    </div>
  );
};

export default MusicTable;

const MusicRow = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-center w-full h-20 my-2 btn btn-ghost group hover:cursor-pointer hover:rounded-md">
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
        <div className="flex flex-col">
          <span className="font-medium">The Finishing</span>
          <span className="text-xs">Alan Walker</span>
        </div>
      </span>
      <span className="p-1 w-[23.333%] lg:w-[20%] flex items-center justify-center text-xs">
        Alan Walker
      </span>
      <span className="p-1 w-[13.333%] lg:w-[10%] flex items-center justify-center text-xs">
        67302
      </span>
      <span className="p-1 w-[13.3%] lg:w-[10%] flex items-center justify-center text-xs">
        5:45
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
      <span className="p-1 w-[3.3%] hidden lg:flex">
        <button className="btn btn-sm btn-circle btn-ghost">
          <img
            src={MenuIcon}
            alt="Menu"
            className={`h-4 rotate-90 ${
              themeContext.theme === Theme.Business ? "invert" : ""
            }`}
          />
        </button>
      </span>
    </div>
  );
};
