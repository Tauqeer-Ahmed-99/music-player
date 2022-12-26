import React, { useContext, useMemo, useState } from "react";

import UploadIcon from "../../assets/svg/upload.svg";
import Dialog from "../../components/Dialog/Dialog";
import MusicContext from "../../context/MusicContext/MusicContext";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";
import useForm, { FieldValue } from "../../hooks/useForm";

const UploadScreen = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const initialValues = useMemo(
    () => ({
      name: {
        value: "",
        validate: (name: FieldValue) => !name,
      },
      composer: {
        value: "",
        validate: (composer: FieldValue) => !composer,
      },
      fileList: {
        value: null,
        validate: (fileList: FieldValue) => !Boolean(fileList),
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
    // resetForm,
  ] = useForm(initialValues);

  const themeContext = useContext(ThemeContext);

  const musicContext = useContext(MusicContext);

  const handleUpload = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      const musicFiles = Array.from(fieldValues.fileList as FileList);
      musicContext.uploadMusic(
        musicFiles,
        fieldValues.name as string,
        fieldValues.composer as string
      );
    }
  };

  return (
    <>
      <div className="flex items-center p-4 mb-4 ml-4 md:mb-8 no-scrollbar">
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
            name="name"
            className={`block w-full h-12 p-2 mt-1 ${
              themeContext.theme === Theme.Business
                ? "bg-gray-700"
                : "bg-gray-100 focus:bg-white"
            } border-transparent rounded-md focus:border-gray-500  focus:ring-0`}
            value={fieldValues.name as string}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          {fieldErrors.name && (
            <span className="text-xs alert-error">Name is needed.</span>
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
            Composer Name
          </span>
          <input
            name="composer"
            className={`block w-full h-12 p-2 mt-1 ${
              themeContext.theme === Theme.Business
                ? "bg-gray-700"
                : "bg-gray-100 focus:bg-white"
            } border-transparent rounded-md focus:border-gray-500  focus:ring-0`}
            value={fieldValues.composer as string}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          {fieldErrors.composer && (
            <span className="text-xs alert-error">
              Composer name is needed.
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
            File
          </span>
          <input
            name="fileList"
            type="file"
            className={`block file-input w-full h-12  mt-1 ${
              themeContext.theme === Theme.Business
                ? "bg-gray-700"
                : "bg-gray-100 focus:bg-white"
            } border-transparent rounded-md focus:border-gray-500  focus:ring-0`}
            // file={fieldValues.fileList as FileList} // not available
            multiple
            accept="audio/mp3,audio/*;capture=microphone"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          {fieldErrors.fileList && (
            <span className="text-xs alert-error">
              Select audio files to upload.
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-end p-2 px-10 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            const isFormValid = validateForm();
            if (isFormValid) {
              setIsConfirmationOpen(true);
            }
          }}
        >
          Upload
        </button>
        <Dialog
          open={isConfirmationOpen}
          heading="Add File"
          content={
            Boolean(fieldValues.fileList as FileList) ? (
              <>
                <span className="block mb-4">Upload following files? </span>
                <span>
                  {Array.from(fieldValues.fileList as FileList).map(
                    (file, idx) => (
                      <span key={file.name + idx} className="block">
                        {file.name}
                      </span>
                    )
                  )}
                </span>
              </>
            ) : (
              <span>Select files to upload.</span>
            )
          }
          action="Upload"
          type="info"
          onAction={() => {
            setIsConfirmationOpen(false);
            handleUpload();
            // resetForm();
          }}
          onCancel={() => setIsConfirmationOpen(false)}
          onClose={() => setIsConfirmationOpen(false)}
        />
        <Dialog
          open={musicContext.isLoading}
          heading="Uploading"
          content={
            Boolean(fieldValues.fileList as FileList) ? (
              <>
                <span>
                  <span>Uploading Following Files:</span>
                  {Array.from(fieldValues.fileList as FileList).map(
                    (file, idx) => (
                      <span key={file.name + idx}>
                        <span>{file.name}</span>
                        <progress
                          className="w-full progress progress-info"
                          value={musicContext.fileUploadProgressPercent[idx]}
                          max="100"
                        ></progress>
                      </span>
                    )
                  )}
                </span>
              </>
            ) : (
              <>
                <span>Uploading Files</span>
                <progress className="w-full progress"></progress>
              </>
            )
          }
          action="none"
          type="info"
        />
      </div>
    </>
  );
};

export default UploadScreen;
