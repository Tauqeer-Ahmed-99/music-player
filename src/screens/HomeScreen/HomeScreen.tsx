import React from "react";

import { generateRandomNumber, wallpapers } from "../../utils/utilities";
import PlayIcon from "../../assets/svg/play.svg";
import ShareIcon from "../../assets/svg/share.svg";
import UploadIcon from "../../assets/svg/upload.svg";
import MusicTable from "../../components/MusicTable/MusicTable";

const HomeScreen = () => {
  const randomIndex = generateRandomNumber(wallpapers.length);

  return (
    <>
      <div className="relative w-full h-1/3 md:h-1/2">
        <img
          src={wallpapers[randomIndex].path}
          alt="Wallpaper"
          className="object-cover w-full h-full"
        />
        <div className="absolute flex items-center w-full pl-16 bottom-6">
          <button className="flex items-center justify-center btn btn-lg btn-circle btn-accent">
            <img src={PlayIcon} className="h-4 invert" alt="Play" />
          </button>
          <button className="ml-4 btn glass btn-circle">
            <img src={ShareIcon} className="h-4 invert" alt="Share" />
          </button>
          <button className="ml-4 btn glass btn-circle">
            <img src={UploadIcon} className="h-4 invert" alt="Upload" />
          </button>
        </div>
      </div>
      <MusicTable />
    </>
  );
};

export default HomeScreen;
