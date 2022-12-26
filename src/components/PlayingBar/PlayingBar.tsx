import React, { useContext, useEffect, useRef, useState } from "react";

import DiscIcon from "../../assets/images/music-disc.png";
import PlayIcon from "../../assets/svg/play.svg";
import PauseIcon from "../../assets/svg/pause.svg";
import NextIcon from "../../assets/svg/next.svg";
import RepeatIcon from "../../assets/svg/repeat.svg";
import ShuffleIcon from "../../assets/svg/shuffle.svg";
import MusicContext from "../../context/MusicContext/MusicContext";
import {
  DefaultPlaylists,
  IAudioFile,
  IPlaylist,
} from "../../context/MusicContext/musicTypes";

const PlayingBar = () => {
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  const [timesInSeconds, setTimesInSeconds] = useState({
    currentTime: 0,
    totalTime: 0,
  });
  const [progress, setProgress] = useState(0);

  const musicContext = useContext(MusicContext);

  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const handlePlayToggleButton = () => {
    musicContext.togglePlay(!musicContext.isAudioPlaying);

    if (!musicContext.currentAudio) {
      if (
        musicContext.recentlyPlayed &&
        musicContext.recentlyPlayed.audioFiles &&
        musicContext.recentlyPlayed.audioFiles[0]
      ) {
        musicContext.changeAudio(
          musicContext.recentlyPlayed?.audioFiles[0] as IAudioFile
        );
      } else {
        if (
          musicContext.uploadedPlaylist &&
          musicContext.uploadedPlaylist.audioFiles &&
          musicContext.uploadedPlaylist.audioFiles[0]
        ) {
          musicContext.changeAudio(
            musicContext.uploadedPlaylist?.audioFiles[0] as IAudioFile
          );
        } else {
          musicContext.togglePlay(false);
        }
      }
    }
  };

  useEffect(() => {
    if (musicContext.isAudioPlaying) {
      audioPlayerRef.current?.play();
    } else {
      audioPlayerRef.current?.pause();
    }
  }, [musicContext.isAudioPlaying]);

  const handleTimeUpdate = (event: any) => {
    setTimesInSeconds((prevState) => ({
      ...prevState,
      currentTime: event.target.currentTime,
    }));
    const minutes = Math.floor(event.target.currentTime / 60);
    const seconds = Math.floor(event.target.currentTime - minutes * 60);
    const currentTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    setCurrentTime(currentTime);
  };

  const handleOnMetaDataLoaded = (event: any) => {
    setTimesInSeconds((prevState) => ({
      ...prevState,
      totalTime: event.target.duration,
    }));
    const minutes = Math.floor(event.target.duration / 60);
    const seconds = Math.floor(event.target.duration - minutes * 60);
    const totalDuration = `${minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setTotalTime(totalDuration);
  };

  useEffect(() => {
    if (timesInSeconds.totalTime > 0 && timesInSeconds.currentTime > 0) {
      setProgress(
        (timesInSeconds.currentTime / timesInSeconds.totalTime) * 100
      );
    }
  }, [timesInSeconds]);

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(event.target.value));
    (audioPlayerRef.current as HTMLMediaElement).currentTime =
      (timesInSeconds.totalTime * Number(event.target.value)) / 100;
  };

  const handlePlaybackEnd = () => {
    console.log("ss");
    const currentPlaylistName = musicContext.currentAudio?.playlistName;
    const currentPlayist: IPlaylist =
      currentPlaylistName === DefaultPlaylists.Upload_Playlist
        ? (musicContext.uploadedPlaylist as IPlaylist)
        : currentPlaylistName === DefaultPlaylists.Recently_Played_Playlist
        ? (musicContext.recentlyPlayed as IPlaylist)
        : ((musicContext.playlists as IPlaylist[]).find(
            (playlist) => playlist.playlistName === currentPlaylistName
          ) as IPlaylist);

    const currentAudioIndex = currentPlayist.audioFiles.findIndex(
      (audio) => audio.id === musicContext.currentAudio?.id
    );

    console.log(currentPlaylistName, currentPlayist, currentAudioIndex);

    if (
      currentAudioIndex > -1 &&
      currentAudioIndex + 1 < currentPlayist.audioFiles.length - 1
    ) {
      musicContext.changeAudio(
        currentPlayist.audioFiles[currentAudioIndex + 1]
      );
    } else {
      console.log(currentPlayist.audioFiles[0]);
      if (currentPlayist.audioFiles[0]) {
        musicContext.changeAudio(currentPlayist.audioFiles[0]);
      } else {
        musicContext.togglePlay(false);
      }
    }
  };

  return (
    <>
      <audio
        src={musicContext.currentAudio?.downloadUrl ?? ""}
        ref={audioPlayerRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleOnMetaDataLoaded}
        onEnded={handlePlaybackEnd}
      />
      {/* Small Screen */}
      <div className="fixed bottom-0 left-0 z-[100] flex items-center justify-between w-screen p-1 bg-gray-900 lg:hidden">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className={`range range-xs range-info absolute top-0 left-0 h-1 m-0 p-0`}
        />
        <div className="flex items-center w-[65%] h-full mt-2">
          <img src={DiscIcon} alt="Music Disc" className="h-12 mr-2 invert" />
          <div className="flex flex-col text-white truncate">
            <span className="font-medium truncate">
              {musicContext.currentAudio?.fileName ?? "Unknown"}
            </span>
            <span className="text-xs truncate">
              {musicContext.currentAudio?.composerName ?? "Unknown"}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <button className="rotate-180 btn btn-circle btn-ghost btn-sm">
            <img src={NextIcon} alt="icon" className="h-4 invert" />
          </button>
          <button
            className="btn btn-circle btn-ghost"
            onClick={handlePlayToggleButton}
          >
            <img
              src={musicContext.isAudioPlaying ? PauseIcon : PlayIcon}
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
          <div className="flex flex-col text-white truncate">
            <span className="font-medium">
              {musicContext.currentAudio?.fileName ?? "Unknown"}
            </span>
            <span className="text-xs">
              {musicContext.currentAudio?.composerName ?? "Unknown"}
            </span>
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
            onClick={handlePlayToggleButton}
          >
            <img
              src={musicContext.isAudioPlaying ? PauseIcon : PlayIcon}
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
          <span className="w-8 ml-8 text-xs text-white">{currentTime}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className={`range range-xs range-info w-96 mx-4`}
          />
          <span className="w-8 mr-8 text-xs text-white">{totalTime}</span>
        </div>
      </div>
    </>
  );
};

export default PlayingBar;
