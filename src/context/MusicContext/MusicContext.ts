import { createContext } from "react";
import { IAudioFile, IInitialContext, IPlaylist } from "./musicTypes";

const initialContext: IInitialContext = {
  currentAudio: null,
  isAudioPlaying: false,
  recentlyPlayed: null,
  playlists: null,
  uploadedPlaylist: null,
  isLoading: false,
  message: "No Message.",
  isError: false,
  errorMessage: "No Error Message.",
  fileUploadProgressPercent: [],
  addToRecentlyPlayed: (audioFile: IAudioFile) => {},
  addToPlaylist: (playlist: IPlaylist, audioFile: IAudioFile) => {},
  removeFromPlaylist: (playlist: IPlaylist, audioFile: IAudioFile) => {},
  uploadMusic: (
    musicFiles: File[],
    playlistName: string,
    composerName: string
  ) => {},
  createPlaylist: (playlistName: string, playlistComposer: string) => {},
  deletePlaylist: (playlist: IPlaylist) => {},
  getUserMusicData: () => {},
  changeAudio: (audioFile: IAudioFile) => {},
  togglePlay: (isPlaying: boolean) => {},
};

const MusicContext = createContext(initialContext);

export default MusicContext;
