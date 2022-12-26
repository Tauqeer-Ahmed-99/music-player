export interface MusicFile {
  id: string;
  file: File;
  name: string;
  composer: string;
}

export interface IUploadFile {
  fileName: string;
  downloadUrl: string;
  playlistName: string;
  composerName: string;
}

export interface IPlayListRawData {
  createdAt: string;
  owner: string;
  playlistName: string;
  audioFiles: IAudioFileRaw;
}

export interface IPlaylistRawResponse {
  [key: string]: IPlayListRawData;
}

export interface IAudioFileRaw {
  composerName: string;
  fileName: string;
  playlistName: string;
  downloadUrl: string;
}

export interface IAudioFileRawResponse {
  [key: string]: IAudioFileRaw;
}

export interface IAudioFile {
  id: string;
  composerName: string;
  fileName: string;
  playlistName: string;
  downloadUrl: string;
}

export interface IPlaylist {
  id: string;
  createdAt: string;
  owner: string;
  playlistName: string;
  audioFiles: IAudioFile[];
}

export type Progress = number;

export interface IInitialContext {
  currentAudio: IAudioFile | null;
  isAudioPlaying: boolean;
  recentlyPlayed: IPlaylist | null;
  playlists: IPlaylist[] | null;
  uploadedPlaylist: IPlaylist | null;
  isLoading: boolean;
  message: string;
  isError: boolean;
  errorMessage: string;
  fileUploadProgressPercent: Progress[];
  addToRecentlyPlayed: (audioFile: IAudioFile) => void;
  addToPlaylist: (playlist: IPlaylist, audioFile: IAudioFile) => void;
  removeFromPlaylist: (playlist: IPlaylist, audioFile: IAudioFile) => void;
  uploadMusic: (
    musicFiles: File[],
    playlistName: string,
    composerName: string
  ) => void;
  createPlaylist: (playlistName: string, playlistComposer: string) => void;
  deletePlaylist: (playlist: IPlaylist) => void;
  getUserMusicData: (uid?: string, authToken?: string) => void;
  changeAudio: (audioFile: IAudioFile) => void;
  togglePlay: (isPlaying: boolean) => void;
}

export interface IPayload {
  recentlyPlayedPlaylist?: IPlaylist;
  playlists?: IPlaylist[];
  uploadedPlaylist?: IPlaylist;
  currentAudio?: IAudioFile;
  isAudioPlaying?: boolean;
}

export interface IMusicAction {
  type: MusicActions;
  payload: IPayload | null;
  error?: any;
  progressPercent?: Progress[];
}

export interface IMusicState {
  currentAudio: IAudioFile | null;
  isAudioPlaying: boolean;
  recentlyPlayed: IPlaylist | null;
  playlists: IPlaylist[] | null;
  uploadedPlaylist: IPlaylist | null;
  isLoading: boolean;
  message: string;
  isError: boolean;
  errorMessage: string;
  fileUploadProgressPercent: Progress[];
}

export enum MusicActions {
  GET_USER_MUSIC_DATA_START = "GET_USER_MUSIC_DATA_START",
  GET_USER_MUSIC_DATA_SUCCESS = "GET_USER_MUSIC_DATA_SUCCESS",
  GET_USER_MUSIC_DATA_FAIL = "GET_USER_MUSIC_DATA_FAIL",
  UPLOAD_FILE_START = "UPLOAD_FILE_START",
  UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS",
  UPLOAD_FILE_FAIL = "UPLOAD_FILE_FAIL",
  UPDATE_UPLOAD_PROGRESS = "UPDATE_UPLOAD_PROGRESS",
  DOWNLOAD_FILE_START = "DOWNLOAD_FILE_START",
  DOWNLOAD_FILE_SUCCESS = "DOWNLOAD_FILE_SUCCESS",
  DOWNLOAD_FILE_FAIL = "DOWNLOAD_FILE_FAIL",
  CREATE_PLAYLIST_START = "CREATE_PLAYLIST_START",
  CREATE_PLAYLIST_SUCCESS = "CREATE_PLAYLIST_SUCCESS",
  CREATE_PLAYLIST_FAIL = "CREATE_PLAYLIST_FAIL",
  ADD_TO_PLAYLIST_START = "ADD_TO_PLAYLIST_START",
  ADD_TO_PLAYLIST_SUCCESS = "ADD_TO_PLAYLIST_SUCCESS",
  ADD_TO_PLAYLIST_FAIL = "ADD_TO_PLAYLIST_FAIL",
  REMOVE_FROM_PLAYLIST_START = "REMOVE_FROM_PLAYLIST_START",
  REMOVE_FROM_PLAYLIST_SUCCESS = "REMOVE_FROM_PLAYLIST_SUCCESS",
  REMOVE_FROM_PLAYLIST_FAIL = "REMOVE_FROM_PLAYLIST_FAIL",
  DELETE_PLAYLIST_START = "DELETE_PLAYLIST_START",
  DELETE_PLAYLIST_SUCCESS = "DELETE_PLAYLIST_SUCCESS",
  DELETE_PLAYLIST_FAIL = "DELETE_PLAYLIST_FAIL",
  ADD_RECENTLY_PLAYED_START = "ADD_RECENTLY_PLAYED_START",
  ADD_RECENTLY_PLAYED_SUCCESS = "ADD_RECENTLY_PLAYED_SUCCESS",
  ADD_RECENTLY_PLAYED_FAIL = "ADD_RECENTLY_PLAYED_FAIL",
  CLOSE_FILE_ERROR_DIALOG = "CLOSE_FILE_ERROR_DIALOG",
  CHANGE_AUDIO_FILE = "CHANGE_AUDIO_FILE",
  TOGGLE_PLAY = "TOGGLE_PLAY",
}

export enum DefaultPlaylists {
  Upload_Playlist = "Upload Playlist",
  Recently_Played_Playlist = "Recently Played Playlist",
}
