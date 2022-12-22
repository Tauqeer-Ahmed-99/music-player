import React, { useContext, useState } from "react";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";

import CreatePlaylistIcon from "../../assets/svg/create-playlist.svg";
import Dialog from "../../components/Dialog/Dialog";

const CreatePlaylistScreen = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const themeContext = useContext(ThemeContext);
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
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
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
            className={`block w-full h-12 p-2 mt-1 ${
              themeContext.theme === Theme.Business
                ? "bg-gray-700"
                : "bg-gray-100 focus:bg-white"
            } border-transparent rounded-md focus:border-gray-500  focus:ring-0`}
          />
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
            className={`block w-full h-12 p-2 mt-1 ${
              themeContext.theme === Theme.Business
                ? "bg-gray-700"
                : "bg-gray-100 focus:bg-white"
            } border-transparent rounded-md focus:border-gray-500  focus:ring-0`}
          />
        </div>
      </div>
      <div className="flex justify-end p-2 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setIsConfirmationOpen(true)}
        >
          Create
        </button>
        {isConfirmationOpen && (
          <Dialog
            heading="Create"
            content="Create a new Playlist?"
            action="Create"
            type="info"
            onAction={() => {}}
            onCancel={() => setIsConfirmationOpen(false)}
            onClose={() => setIsConfirmationOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default CreatePlaylistScreen;
