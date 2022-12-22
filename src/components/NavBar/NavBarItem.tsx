import React, { useContext } from "react";
import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";

import { useNavigate, useLocation } from "react-router-dom";

const NavBarItem = ({
  icon,
  label,
  path,
}: {
  icon: string;
  label: string;
  path: string;
}) => {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <li
      onClick={() => {
        navigate(path);
      }}
      className={`flex justify-center w-full h-10 pl-4 mt-2 rounded-md hover:cursor-pointer btn${
        pathname === path ? " btn-active " : " "
      } btn-ghost`}
    >
      <img
        src={icon}
        alt="Icon"
        height={55}
        width={55}
        className={`hover:bg-transparent${
          themeContext.theme === Theme.Business ? " invert" : ""
        } delay-700 stroke-1 hover:stroke-2`}
      />
      <span className="flex items-center w-full pl-0 prose-sm prose hover:bg-transparent prose-gray">
        {label}
      </span>
    </li>
  );
};

export default NavBarItem;
