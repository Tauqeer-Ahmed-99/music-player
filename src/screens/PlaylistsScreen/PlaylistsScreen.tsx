import React, { useContext, useState } from "react";

import PlaylistIcon from "../../assets/svg/playlists.svg";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";

import MenuIcon from "../../assets/svg/menu.svg";
import ArrowIcon from "../../assets/svg/arrow-right.svg";
import MusicContext from "../../context/MusicContext/MusicContext";
import MusicTable from "../../components/MusicTable/MusicTable";
import { IPlaylist } from "../../context/MusicContext/musicTypes";
import Dialog from "../../components/Dialog/Dialog";

const PlaylistsScreen = () => {
  const themeContext = useContext(ThemeContext);

  const musicContext = useContext(MusicContext);
  return (
    <div className="no-scrollbar">
      <div className="flex items-center px-4 mb-4 ml-4 md:mb-8 no-scrollbar">
        <img
          src={PlaylistIcon}
          alt="Playlist Icon"
          className={`${
            themeContext.theme === "business" ? "h-6 invert mr-4" : "h-6 mr-4"
          }`}
        />
        <span className="font-medium">Available Playlists</span>
      </div>
      <PlaylistItem
        key={musicContext.uploadedPlaylist?.id}
        name="My Uploads"
        id={musicContext.uploadedPlaylist?.id as string}
      />
      {musicContext.playlists?.map((playlist, index) => (
        <PlaylistItem
          key={playlist.id}
          name={playlist.playlistName}
          id={playlist.id}
          index={index}
          playlist={playlist}
        />
      ))}
    </div>
  );
};

export default PlaylistsScreen;

const PlaylistItem = ({
  name,
  id,
  index,
  playlist,
}: {
  name: string;
  id: string;
  index?: number;
  playlist?: IPlaylist;
}) => {
  const [isPlaylistOpen, setPlaylistOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const themeContext = useContext(ThemeContext);
  const musicContext = useContext(MusicContext);

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handlePlaylistDeleteClick = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const handlePlaylistDeleteConfirmation = () => {
    musicContext.deletePlaylist(playlist as IPlaylist);
  };

  return (
    <>
      <div
        className={`flex items-center btn-ghost h-16 justify-between my-2 px-8 hover:cursor-pointer rounded-md no-scrollbar`}
        onClick={() => setPlaylistOpen((prevState) => !prevState)}
      >
        <div className="flex items-center">
          <img
            src={ArrowIcon}
            alt="Arrow Icon"
            className={`btn btn-sm btn-ghost btn-circle ${
              themeContext.theme === Theme.Business
                ? "h-6 invert mr-4"
                : "h-6 mr-4"
            } ${isPlaylistOpen ? "rotate-90" : ""}`}
          />
          <img
            src={PlaylistIcon}
            alt="Playlist Icon"
            className={`${
              themeContext.theme === Theme.Business
                ? "h-6 invert mr-4"
                : "h-6 mr-4"
            }`}
          />
          <span className="text-lg font-medium">{name}</span>
        </div>
        {name !== "My Uploads" && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle btn-sm"
              onClick={handleMenuButtonClick}
            >
              <img
                src={MenuIcon}
                alt="Menu"
                className={`h-4 rotate-90 ${
                  themeContext.theme === "business" ? "invert" : ""
                }`}
              />
              <ul
                tabIndex={0}
                className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
              >
                <li onClick={handlePlaylistDeleteClick}>
                  <span>Delete</span>
                </li>
              </ul>
            </label>
            <Dialog
              open={isDeleteConfirmationOpen}
              heading="Delete Playlist"
              content="Do you want to delete this playlist?"
              type="error"
              action="Delete"
              onAction={handlePlaylistDeleteConfirmation}
              onCancel={() => setIsDeleteConfirmationOpen(false)}
            />
          </div>
        )}
      </div>
      {name === "My Uploads" &&
        isPlaylistOpen &&
        musicContext.uploadedPlaylist?.audioFiles.length !== undefined &&
        musicContext.uploadedPlaylist?.audioFiles.length > 0 && (
          <MusicTable audioFiles={musicContext.uploadedPlaylist?.audioFiles} />
        )}
      {name === "My Uploads" &&
        isPlaylistOpen &&
        musicContext.uploadedPlaylist?.audioFiles.length !== undefined &&
        musicContext.uploadedPlaylist?.audioFiles.length === 0 && (
          <div className="px-8 my-4">
            No audio files available in this playlist.
          </div>
        )}
      {isPlaylistOpen &&
        index !== undefined &&
        musicContext.playlists?.[index]?.audioFiles.length !== undefined &&
        (musicContext.playlists?.[index]?.audioFiles.length > 0 ? (
          <MusicTable
            audioFiles={musicContext.playlists?.[index]?.audioFiles}
            playlist={playlist}
          />
        ) : (
          <div className="px-8 my-4">
            No audio files available in this playlist.
          </div>
        ))}
    </>
  );
};
