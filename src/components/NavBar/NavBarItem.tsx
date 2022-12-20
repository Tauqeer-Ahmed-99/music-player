import React from "react";

const NavBarItem = ({ icon, label }: { icon: any; label: string }) => {
  return (
    <li className="flex justify-center w-full h-10 pl-4 rounded-md btn-ghost btn hover:cursor-pointer hover:bg-primary">
      <img
        src={icon}
        alt="Icon"
        height={55}
        width={55}
        className="hover:bg-transparent"
      />
      <span className="flex items-center w-full pl-0 hover:bg-transparent">
        {label}
      </span>
    </li>
  );
};

export default NavBarItem;
