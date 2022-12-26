import React, { useState } from "react";

import DiscIcon from "../../assets/images/music-disc.png";
import PlayIcon from "../../assets/svg/play.svg";
import PauseIcon from "../../assets/svg/pause.svg";
import NextIcon from "../../assets/svg/next.svg";
import RepeatIcon from "../../assets/svg/repeat.svg";
import ShuffleIcon from "../../assets/svg/shuffle.svg";

const PlayingBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const progress = "63.6%";
  const currentTime = "2:08";
  const totalTime = "5:20";
  return (
    <>
      {/* Small Screen */}
      <div className="fixed bottom-0 left-0 z-[100] flex items-center justify-between w-screen p-1 bg-gray-900 lg:hidden">
        <input
          type="range"
          min="0"
          max="100"
          defaultValue={progress}
          className={`range range-xs range-info absolute top-0 left-0 h-1 m-0 p-0`}
        />
        <div className="flex items-center h-full mt-2">
          <img src={DiscIcon} alt="Music Disc" className="h-12 mr-2 invert" />
          <div className="flex flex-col text-white">
            <span className="font-medium">The Finishing</span>
            <span className="text-xs">Alan Walker</span>
          </div>
        </div>
        <div className="flex items-center">
          <button className="rotate-180 btn btn-circle btn-ghost btn-sm">
            <img src={NextIcon} alt="icon" className="h-4 invert" />
          </button>
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => setIsPlaying((prevState) => !prevState)}
          >
            <img
              src={isPlaying ? PauseIcon : PlayIcon}
              alt="icon"
              className="h-6 invert"
            />
          </button>
          <button className="btn btn-circle btn-ghost btn-sm">
            <img src={NextIcon} alt="icon" className="h-4 invert" />
          </button>
        </div>
      </div>
      {/* Large Screen */}
      <div className="hidden lg:flex fixed bottom-0 left-0 z-[100] items-center justify-between w-screen p-1 bg-gray-900">
        <div className="flex items-center h-full w-22">
          <img src={DiscIcon} alt="Music Disc" className="h-12 mr-2 invert" />
          <div className="flex flex-col text-white ">
            <span className="font-medium">The Finishing</span>
            <span className="text-xs">Alan Walker</span>
          </div>
        </div>
        <div className="flex items-center">
          <button className="mr-4 btn btn-ghost btn-circle btn-sm">
            <img src={ShuffleIcon} alt="Shuffle" className="h-4 invert" />
          </button>
          <button className="rotate-180 btn btn-circle btn-ghost btn-sm">
            <img src={NextIcon} alt="icon" className="h-4 invert" />
          </button>
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => setIsPlaying((prevState) => !prevState)}
          >
            <img
              src={isPlaying ? PauseIcon : PlayIcon}
              alt="icon"
              className="h-6 invert"
            />
          </button>
          <button className="btn btn-circle btn-ghost btn-sm">
            <img src={NextIcon} alt="icon" className="h-4 invert" />
          </button>
          <button className="ml-4 btn btn-ghost btn-circle btn-sm">
            <img src={RepeatIcon} alt="Repeat" className="h-4 invert" />
          </button>
          <span className="ml-8 text-xs text-white">{currentTime}</span>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={progress}
            className={`range range-xs range-info w-96 mx-4`}
          />
          <span className="mr-8 text-xs text-white">{totalTime}</span>
        </div>
      </div>
    </>
  );
};

export default PlayingBar;
