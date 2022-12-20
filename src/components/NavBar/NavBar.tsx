import React from "react";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

import HomeIcon from "../../assets/svg/home.svg";
import RecentlyPlayedIcon from "../../assets/svg/recently-played.svg";
import CollectionsIcon from "../../assets/svg/collections.svg";
import PlaylistsIcon from "../../assets/svg/playlists.svg";
import CreatePlaylistIcon from "../../assets/svg/create-playlist.svg";
import NavBarItem from "./NavBarItem";

const navBarItems = [
  {
    icon: HomeIcon,
    label: "Home",
  },
  {
    icon: RecentlyPlayedIcon,
    label: "Recently Played",
  },
  {
    icon: CollectionsIcon,
    label: "Collections",
  },
  {
    icon: PlaylistsIcon,
    label: "Playlists",
  },
  {
    icon: CreatePlaylistIcon,
    label: "Create Playlists",
  },
];

const NavBar = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col items-center justify-center drawer-content lg:justify-start">
          <div className="fixed top-0 right-0 z-50 w-screen navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <label
                  tabIndex={0}
                  htmlFor="my-drawer-2"
                  className="swap swap-rotate btn btn-ghost btn-circle drawer-button lg:hidden"
                >
                  <input type="checkbox" />
                  <svg
                    className="w-5 h-5 fill-current swap-on"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 fill-current swap-off"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </label>
              </div>
            </div>
            <div className="navbar-center">
              <span className="text-xl normal-case btn btn-ghost">
                Music Player
              </span>
            </div>
            <div className="navbar-end">
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
              <ThemeSwitch size="small" />
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" alt="Avatar" />
                </div>
              </label>
            </div>
          </div>
          {/* { <!-- Page content here -->} */}
          <div className="w-full h-screen pt-16">{children}</div>
        </div>
        <div className="mt-16 drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="p-4 w-60 menu bg-base-100 text-base-content">
            {/* { <!-- Sidebar content here -->} */}
            {navBarItems.map((navBarItem) => (
              <NavBarItem {...navBarItem} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
