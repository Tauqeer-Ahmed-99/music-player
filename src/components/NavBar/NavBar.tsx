import React, { useContext, useState } from "react";

import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import NavBarItem from "./NavBarItem";
import routes from "../../routes/routes";
import UserContext from "../../context/UserContext/UserContext";
import Dialog from "../Dialog/Dialog";

const NavBar = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const userContext = useContext(UserContext);
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col items-center justify-center drawer-content lg:justify-start">
          <div className="fixed top-0 right-0 z-50 w-screen navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                {userContext.user && (
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
                )}
              </div>
            </div>
            <div className="navbar-center">
              <span className="text-xl normal-case btn btn-ghost md:hidden">
                Music
              </span>
              <span className="items-center justify-center hidden text-xl normal-case btn btn-ghost md:flex">
                Music Player
              </span>
            </div>
            <div className="navbar-end">
              {userContext.user && (
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
              )}
              <ThemeSwitch size="small" />
              {userContext.user && (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          userContext.user.photoURL ??
                          `https://avatars.dicebear.com/api/adventurer/${userContext.user.uid}.svg`
                        }
                        alt="Avatar"
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <span className="flex-col items-start justify-center break-all">
                        {userContext.user.displayName ??
                          "User " + userContext.user.uid}
                        <span className="badge">Welcome</span>
                      </span>
                    </li>
                    {/* <li>
                      <span>Settings</span>
                    </li> */}
                    <li onClick={() => setIsConfirmationOpen(true)}>
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* { <!-- Page content here -->} */}
          <div className="w-full h-screen pt-16">{children}</div>
        </div>
        {userContext.user && (
          <div className="mt-16 drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="p-4 w-60 menu bg-base-100 text-base-content">
              {/* { <!-- Sidebar content here -->} */}
              {routes
                .filter(
                  (route) =>
                    route.path !== "/login" &&
                    route.path !== "/signup" &&
                    route.path !== "/"
                )
                .map((navBarItem) => (
                  <NavBarItem key={navBarItem.label} {...navBarItem} />
                ))}
            </ul>
          </div>
        )}
      </div>
      <Dialog
        open={isConfirmationOpen}
        heading="Sign out"
        content="Do you really want to signout?"
        type="error"
        action="Signout"
        onAction={() => {
          setIsConfirmationOpen(false);
          userContext.signout();
        }}
        onCancel={() => setIsConfirmationOpen(false)}
      />
    </>
  );
};

export default NavBar;
