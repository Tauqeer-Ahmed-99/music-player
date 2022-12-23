import React, { useContext, useState } from "react";

import UploadIcon from "../../assets/svg/upload.svg";
import Dialog from "../../components/Dialog/Dialog";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";

const UploadScreen = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const themeContext = useContext(ThemeContext);

  return (
    <>
      <div className="flex items-center p-4 mb-4 ml-4 md:mb-8">
        <img
          src={UploadIcon}
          alt="Create Playlist Icon"
          className={`${
            themeContext.theme === Theme.Business
              ? "h-6 invert mr-4"
              : "h-6 mr-4"
          }`}
        />
        <span className="font-medium">Upload an Item</span>
      </div>
      <div className="px-8">
        <div className="p-2">
          <span
            className={`${
              themeContext.theme === Theme.Business
                ? "text-white"
                : "text-gray-700"
            }`}
          >
            Name
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
            Composer Name
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
            File
          </span>
          <input
            type="file"
            className={`block w-full h-12 p-2 mt-1 ${
              themeContext.theme === Theme.Business
                ? "bg-gray-700"
                : "bg-gray-100 focus:bg-white"
            } border-transparent rounded-md focus:border-gray-500  focus:ring-0`}
          />
        </div>
      </div>
      <div className="flex justify-end p-2 px-10 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setIsConfirmationOpen(true)}
        >
          Create
        </button>

        <Dialog
          open={isConfirmationOpen}
          heading="Add File"
          content="Add this file in Uploaded Playlist?"
          action="Add"
          type="info"
          onAction={() => {}}
          onCancel={() => setIsConfirmationOpen(false)}
          onClose={() => setIsConfirmationOpen(false)}
        />
      </div>
    </>
  );
};

export default UploadScreen;
