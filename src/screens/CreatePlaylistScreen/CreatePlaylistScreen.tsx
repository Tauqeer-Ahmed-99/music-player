import React, { useContext, useMemo, useState } from "react";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";

import CreatePlaylistIcon from "../../assets/svg/create-playlist.svg";
import Dialog from "../../components/Dialog/Dialog";
import useForm, { FieldValue } from "../../hooks/useForm";
import MusicContext from "../../context/MusicContext/MusicContext";

const CreatePlaylistScreen = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const themeContext = useContext(ThemeContext);

  const musicContext = useContext(MusicContext);

  const initialValues = useMemo(
    () => ({
      playlistName: {
        value: "",
        validate: (playlistName: FieldValue) => !playlistName,
      },
      playlistComposer: {
        value: "",
        validate: (playlistComposer: FieldValue) => !playlistComposer,
      },
    }),
    []
  );

  const [
    fieldValues,
    fieldErrors,
    handleInputChange,
    handleInputBlur,
    validateForm,
    resetForm,
  ] = useForm(initialValues);

  return (
    <>
      <div className="flex items-center p-4 mb-4 ml-4 md:mb-8">
        <img
          src={CreatePlaylistIcon}
          alt="Create Playlist Icon"
          className={`${
            themeContext.theme === Theme.Business
              ? "h-6 invert mr-4"
              : "h-6 mr-4"
          }`}
        />
        <span className="font-medium">Create a new Playlist</span>
      </div>
      <div className="grid w-full grid-cols-1 gap-8 px-8 md:grid-cols-2">
        <div className="p-2">
          <span
            className={`${
              themeContext.theme === Theme.Business
                ? "text-white"
                : "text-gray-700"
            }`}
          >
            Playlist Name
          </span>
          <input
            name="playlistName"
            className={`block w-full h-12 p-2 mt-1 ${
              themeContext.theme === Theme.Business
                ? "bg-gray-700"
                : "bg-gray-100 focus:bg-white"
            } border-transparent rounded-md focus:border-gray-500  focus:ring-0`}
            value={fieldValues.playlistName as string}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          {fieldErrors.playlistName && (
            <span className="text-xs alert-error">
              Playlist name is required.
            </span>
          )}
        </div>
        <div className="p-2">
          <span
            className={`${
              themeContext.theme === Theme.Business
                ? "text-white"
                : "text-gray-700"
            }`}
          >
            Playlist Composer
          </span>
          <input
            name="playlistComposer"
            className={`block w-full h-12 p-2 mt-1 ${
              themeContext.theme === Theme.Business
                ? "bg-gray-700"
                : "bg-gray-100 focus:bg-white"
            } border-transparent rounded-md focus:border-gray-500  focus:ring-0`}
            value={fieldValues.playlistComposer as string}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          {fieldErrors.playlistComposer && (
            <span className="text-xs alert-error">
              Playlist composer is required.
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-end p-2 px-10 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            const isFormValid = validateForm();
            if (isFormValid) setIsConfirmationOpen(true);
          }}
        >
          Create
        </button>

        <Dialog
          open={isConfirmationOpen}
          heading="Create"
          content={`Create a new playlist? "${fieldValues.playlistName}"`}
          action="Create"
          type="info"
          onAction={() => {
            setIsConfirmationOpen(false);
            musicContext.createPlaylist(
              fieldValues.playlistName as string,
              fieldValues.playlistComposer as string
            );
            resetForm();
          }}
          onCancel={() => setIsConfirmationOpen(false)}
          onClose={() => setIsConfirmationOpen(false)}
        />
        <Dialog
          open={musicContext.isLoading}
          heading="Loading..."
          content={
            <span>
              <span className="block">{musicContext.message}</span>
              <progress className="w-full progress"></progress>
            </span>
          }
          action="none"
          type="info"
        />
      </div>
    </>
  );
};

export default CreatePlaylistScreen;
