import React, { useContext, useEffect, useReducer } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import MusicContext from "./MusicContext";
import {
  DefaultPlaylists,
  IAudioFile,
  IMusicAction,
  IMusicState,
  IPlaylist,
  IPlaylistRawResponse,
  IUploadFile,
  MusicActions,
  Progress,
} from "./musicTypes";
import UserContext from "../UserContext/UserContext";

const initialState: IMusicState = {
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
};

const musicReducer = (
  state: IMusicState = initialState,
  action: IMusicAction
) => {
  const { type, payload, error, progressPercent } = action;

  switch (type) {
    case MusicActions.GET_USER_MUSIC_DATA_START:
      return { ...state, isLoading: true, message: "Fetching data..." };
    case MusicActions.GET_USER_MUSIC_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Data fetching successful.",
        playlists: payload?.playlists as IPlaylist[],
        uploadedPlaylist: payload?.uploadedPlaylist as IPlaylist,
        recentlyPlayed: payload?.recentlyPlayedPlaylist as IPlaylist,
      };
    case MusicActions.GET_USER_MUSIC_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: error.message,
      };
    case MusicActions.UPLOAD_FILE_START:
      return { ...state, isLoading: true, message: "Uploading File..." };
    case MusicActions.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "File Upload Complete.",
        uploadedPlaylist: payload?.uploadedPlaylist as IPlaylist,
      };
    case MusicActions.UPDATE_UPLOAD_PROGRESS:
      return {
        ...state,
        fileUploadProgressPercent:
          progressPercent ?? state.fileUploadProgressPercent,
      };
    case MusicActions.UPLOAD_FILE_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: error.message,
      };
    case MusicActions.CREATE_PLAYLIST_START:
      return {
        ...state,
        isLoading: true,
        message: "Creating a new playlist...",
      };
    case MusicActions.CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Playlist creation successful.",
        playlists: payload?.playlists as IPlaylist[],
      };
    case MusicActions.CREATE_PLAYLIST_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: error.message,
      };
    case MusicActions.ADD_TO_PLAYLIST_START:
      return {
        ...state,
        isLoading: true,
        message: "Adding to the playlist...",
      };
    case MusicActions.ADD_TO_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Added to the selected playlist.",
        playlists: payload?.playlists as IPlaylist[],
      };
    case MusicActions.ADD_TO_PLAYLIST_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: error.message,
      };
    case MusicActions.DELETE_PLAYLIST_START:
      return {
        ...state,
        isLoading: true,
        message: "Deleting playlist...",
      };
    case MusicActions.DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Playlist successfully deleted.",
        playlists: payload?.playlists as IPlaylist[],
      };
    case MusicActions.DELETE_PLAYLIST_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: error.message,
      };
    case MusicActions.REMOVE_FROM_PLAYLIST_START:
      return {
        ...state,
        isLoading: true,
        message: "Removing from the playlist...",
      };
    case MusicActions.REMOVE_FROM_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Removed from the selected playlist.",
        playlists: payload?.playlists as IPlaylist[],
      };
    case MusicActions.REMOVE_FROM_PLAYLIST_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: error.message,
      };
    case MusicActions.ADD_RECENTLY_PLAYED_START:
      return {
        ...state,
        isLoading: false,
        message: "Adding to recently played playlist...",
      };
    case MusicActions.ADD_RECENTLY_PLAYED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recentlyPlayed: payload?.recentlyPlayedPlaylist as IPlaylist,
        message: "Added to the recently played playlist.",
      };
    case MusicActions.ADD_RECENTLY_PLAYED_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: error.message,
      };
    case MusicActions.CHANGE_AUDIO_FILE:
      return {
        ...state,
        currentAudio: payload?.currentAudio as IAudioFile,
        isAudioPlaying: true,
      };
    case MusicActions.TOGGLE_PLAY:
      return { ...state, isAudioPlaying: payload?.isAudioPlaying as boolean };
    default:
      return state;
  }
};

const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [musicState, dispatch] = useReducer(musicReducer, initialState);

  const userContext = useContext(UserContext);

  const uploadMusic = async (
    musicFiles: File[],
    playlistName: string,
    composerName: string
  ) => {
    try {
      dispatch({ type: MusicActions.UPLOAD_FILE_START, payload: null });
      const uploadData: IUploadFile[] = [];

      const uploadPromises: any[] = [];

      const progressArray: Progress[] = new Array(musicFiles.length).fill(0);

      const uploadFileAsPromise = (file: File, index: number) => {
        let url;
        return new Promise((resolve, reject) => {
          const firebaseStorageRef = ref(
            storage,
            `user/${userContext.user?.uid}/${file.name}`
          );

          //Upload file
          const uploadTask = uploadBytesResumable(firebaseStorageRef, file);

          //Update progress bar
          uploadTask.on(
            "state_changed",
            function progress(snapshot) {
              //  Observe state change events such as progress, pause, and resume
              //  Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

              const percentage = +(
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
              ).toFixed(2);

              progressArray[index] = percentage;

              dispatch({
                type: MusicActions.UPDATE_UPLOAD_PROGRESS,
                payload: null,
                progressPercent: progressArray,
              });
            },
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  console.log(error);
                  dispatch({
                    type: MusicActions.UPLOAD_FILE_FAIL,
                    payload: null,
                    error,
                  });
                  break;
                case "storage/canceled":
                  // User canceled the upload
                  console.log(error);
                  dispatch({
                    type: MusicActions.UPLOAD_FILE_FAIL,
                    payload: null,
                    error,
                  });
                  break;
                // ...
                case "storage/unknown":
                  // Unknown error occurred, inspect error.serverResponse
                  console.log(error);
                  dispatch({
                    type: MusicActions.UPLOAD_FILE_FAIL,
                    payload: null,
                    error,
                  });
                  break;
              }
              reject(error);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                url = downloadURL;
                uploadData.push({
                  playlistName: "Upload Playlist",
                  fileName: file.name,
                  downloadUrl: url,
                  composerName,
                });
                resolve(url);
              });
            }
          );
        });
      };

      musicFiles.forEach((musicFile, index) => {
        uploadPromises.push(uploadFileAsPromise(musicFile, index));
      });

      await Promise.all(uploadPromises);

      const token = await userContext.user?.getIdToken();

      const uploadPlaylistId = musicState.uploadedPlaylist?.id;

      const dataId: string[] = [];

      for (const data of uploadData) {
        const res = await fetch(
          `https://play-it-music-player-default-rtdb.firebaseio.com/files/${userContext.user?.uid}/${uploadPlaylistId}/audioFiles.json?auth=${token}`,
          {
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        const parsedRes = await res.json();

        dataId.push(parsedRes.name);
      }

      const uploadedData = uploadData.map(
        (data, idx) =>
          ({
            ...data,
            id: dataId[idx],
          } as IAudioFile)
      );

      dispatch({
        type: MusicActions.UPLOAD_FILE_SUCCESS,
        payload: {
          uploadedPlaylist: musicState.uploadedPlaylist
            ? {
                ...musicState.uploadedPlaylist,
                audioFiles: musicState.uploadedPlaylist?.audioFiles
                  ? ([
                      ...musicState.uploadedPlaylist?.audioFiles,
                      ...uploadedData,
                    ] as IAudioFile[])
                  : (uploadedData as IAudioFile[]),
              }
            : undefined,
        },
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: MusicActions.UPLOAD_FILE_FAIL,
        payload: null,
        error,
      });
    }
  };

  const createPlaylist = async (
    playlistName: string,
    playlistComposer: string
  ) => {
    try {
      dispatch({ type: MusicActions.CREATE_PLAYLIST_START, payload: null });

      const body = {
        playlistName,
        playlistComposer,
        owner: userContext.user?.displayName as string,
        createdAt: new Date().toISOString(),
      };

      const token = await userContext.user?.getIdToken();

      const response = await fetch(
        `https://play-it-music-player-default-rtdb.firebaseio.com/files/${userContext.user?.uid}.json?auth=${token}`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      const parsedResponse = await response.json();

      const uploadedPlaylist: IPlaylist = {
        ...body,
        id: parsedResponse.name,
        audioFiles: [],
      };

      dispatch({
        type: MusicActions.CREATE_PLAYLIST_SUCCESS,
        payload: {
          playlists: musicState.playlists
            ? [...musicState.playlists, uploadedPlaylist]
            : [uploadedPlaylist],
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: MusicActions.CREATE_PLAYLIST_FAIL,
        payload: null,
        error,
      });
    }
  };

  const parseData = async (data: Response) => {
    const parsedData: IPlaylistRawResponse = await data.json();

    console.log(parsedData);

    const parsedArray = Object.entries(parsedData).map((item) => ({
      ...item[1],
      id: item[0],
      audioFiles: Object.entries(item[1].audioFiles ?? {}).map(
        (item) =>
          ({
            ...item[1],
            id: item[0],
          } as IAudioFile)
      ),
    }));

    let uploadedPlaylist: IPlaylist = {
      id: "",
      createdAt: "",
      owner: "",
      playlistName: "",
      audioFiles: [],
    };
    let recentlyPlayedPlaylist: IPlaylist = {
      id: "",
      createdAt: "",
      owner: "",
      playlistName: "",
      audioFiles: [],
    };

    const playlists = parsedArray.filter((playlist) => {
      if (playlist.playlistName === DefaultPlaylists.Upload_Playlist) {
        uploadedPlaylist = playlist;
      } else if (
        playlist.playlistName === DefaultPlaylists.Recently_Played_Playlist
      ) {
        recentlyPlayedPlaylist = playlist;
      }
      return (
        playlist.playlistName !== DefaultPlaylists.Upload_Playlist &&
        playlist.playlistName !== DefaultPlaylists.Recently_Played_Playlist
      );
    });

    console.log(uploadedPlaylist, recentlyPlayedPlaylist, playlists);

    return { playlists, uploadedPlaylist, recentlyPlayedPlaylist };
  };

  const getUserMusicData = async (uid?: string, authToken?: string) => {
    try {
      dispatch({ type: MusicActions.GET_USER_MUSIC_DATA_START, payload: null });

      const token = authToken ?? (await userContext.user?.getIdToken());

      const userMusicData = await fetch(
        `https://play-it-music-player-default-rtdb.firebaseio.com/files/${
          uid ?? userContext.user?.uid
        }/.json?auth=${token}`
      );

      const { playlists, uploadedPlaylist, recentlyPlayedPlaylist } =
        await parseData(userMusicData);

      dispatch({
        type: MusicActions.GET_USER_MUSIC_DATA_SUCCESS,
        payload: {
          playlists,
          uploadedPlaylist,
          recentlyPlayedPlaylist,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: MusicActions.GET_USER_MUSIC_DATA_FAIL,
        payload: null,
        error,
      });
    }
  };

  useEffect(() => {
    if (userContext.user) {
      getUserMusicData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user]);

  const addToRecentlyPlayed = async (audioFile: IAudioFile) => {
    try {
      dispatch({
        type: MusicActions.ADD_RECENTLY_PLAYED_START,
        payload: null,
      });

      const token = await userContext.user?.getIdToken();

      const response = await fetch(
        `https://play-it-music-player-default-rtdb.firebaseio.com/files/${userContext.user?.uid}/${musicState.recentlyPlayed?.id}/audioFiles.json?auth=${token}`,
        { method: "POST", body: JSON.stringify(audioFile) }
      );

      const parsedResponse = await response.json();

      const newlyAddedRecent = {
        ...audioFile,
        id: parsedResponse.name,
        createdAt: new Date().toISOString(),
        playlistName: "Recently Played Playlist",
      };

      dispatch({
        type: MusicActions.ADD_RECENTLY_PLAYED_SUCCESS,
        payload: {
          recentlyPlayedPlaylist: {
            ...musicState.recentlyPlayed,
            audioFiles: musicState.recentlyPlayed?.audioFiles
              ? [...musicState.recentlyPlayed?.audioFiles, newlyAddedRecent]
              : [newlyAddedRecent],
          } as IPlaylist,
        },
      });
    } catch (error: any) {
      dispatch({
        type: MusicActions.ADD_RECENTLY_PLAYED_FAIL,
        payload: null,
        error,
      });
    }
  };

  const addToPlaylist = async (playlist: IPlaylist, audioFile: IAudioFile) => {
    try {
      dispatch({ type: MusicActions.ADD_TO_PLAYLIST_START, payload: null });

      const token = await userContext.user?.getIdToken();

      const response = await fetch(
        `https://play-it-music-player-default-rtdb.firebaseio.com/files/${userContext.user?.uid}/${playlist.id}/audioFiles.json?auth=${token}`,
        { method: "POST", body: JSON.stringify(audioFile) }
      );

      const parsedResponse = await response.json();

      let selectedPlaylistIndex = 0;

      const selectedPlaylist = (musicState.playlists as IPlaylist[]).find(
        (item, index) => {
          selectedPlaylistIndex = index;
          return item.id === playlist.id;
        }
      );

      (selectedPlaylist as IPlaylist).audioFiles = (
        selectedPlaylist as IPlaylist
      ).audioFiles
        ? [
            ...(selectedPlaylist as IPlaylist)?.audioFiles,
            { ...audioFile, id: parsedResponse.name },
          ]
        : [{ ...audioFile, id: parsedResponse.name }];

      musicState.playlists?.splice(
        selectedPlaylistIndex,
        1,
        selectedPlaylist as IPlaylist
      );

      dispatch({
        type: MusicActions.ADD_TO_PLAYLIST_SUCCESS,
        payload: {
          playlists: musicState.playlists as IPlaylist[],
        },
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: MusicActions.ADD_TO_PLAYLIST_FAIL,
        payload: null,
        error,
      });
    }
  };

  const removeFromPlaylist = async (
    playlist: IPlaylist,
    audioFile: IAudioFile
  ) => {
    try {
      dispatch({
        type: MusicActions.REMOVE_FROM_PLAYLIST_START,
        payload: null,
      });

      const token = await userContext.user?.getIdToken();

      await fetch(
        `https://play-it-music-player-default-rtdb.firebaseio.com/files/${userContext.user?.uid}/${playlist.id}/audioFiles/${audioFile.id}.json?auth=${token}`,
        { method: "DELETE" }
      );

      playlist.audioFiles = playlist.audioFiles.filter(
        (item) => audioFile.id !== item.id
      );

      const selectedPlaylistIndex = (
        musicState.playlists as IPlaylist[]
      ).findIndex((item) => item.id === playlist.id);

      musicState.playlists?.splice(selectedPlaylistIndex, 1, playlist);

      dispatch({
        type: MusicActions.REMOVE_FROM_PLAYLIST_SUCCESS,
        payload: {
          playlists: musicState.playlists as IPlaylist[],
        },
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: MusicActions.REMOVE_FROM_PLAYLIST_FAIL,
        payload: null,
        error,
      });
    }
  };

  const deletePlaylist = async (playlist: IPlaylist) => {
    try {
      dispatch({
        type: MusicActions.DELETE_PLAYLIST_START,
        payload: null,
      });

      const token = await userContext.user?.getIdToken();

      await fetch(
        `https://play-it-music-player-default-rtdb.firebaseio.com/files/${userContext.user?.uid}/${playlist.id}.json?auth=${token}`,
        { method: "DELETE" }
      );

      const playlists = (musicState.playlists as IPlaylist[]).filter(
        (item) => item.id !== playlist.id
      );

      dispatch({
        type: MusicActions.DELETE_PLAYLIST_SUCCESS,
        payload: {
          playlists,
        },
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: MusicActions.DELETE_PLAYLIST_FAIL,
        payload: null,
        error,
      });
    }
  };

  const changeAudio = (audioFile: IAudioFile) => {
    dispatch({
      type: MusicActions.CHANGE_AUDIO_FILE,
      payload: { currentAudio: audioFile },
    });
  };

  const togglePlay = (isPlaying: boolean) => {
    dispatch({
      type: MusicActions.TOGGLE_PLAY,
      payload: { isAudioPlaying: isPlaying },
    });
  };

  const context = {
    currentAudio: musicState.currentAudio,
    isAudioPlaying: musicState.isAudioPlaying,
    recentlyPlayed: musicState.recentlyPlayed,
    playlists: musicState.playlists,
    uploadedPlaylist: musicState.uploadedPlaylist,
    isLoading: musicState.isLoading,
    message: musicState.message,
    isError: musicState.isError,
    errorMessage: musicState.errorMessage,
    fileUploadProgressPercent: musicState.fileUploadProgressPercent,
    addToRecentlyPlayed,
    addToPlaylist,
    removeFromPlaylist,
    uploadMusic,
    createPlaylist,
    deletePlaylist,
    getUserMusicData,
    changeAudio,
    togglePlay,
  };

  return (
    <MusicContext.Provider value={context}>{children}</MusicContext.Provider>
  );
};

export default MusicProvider;
