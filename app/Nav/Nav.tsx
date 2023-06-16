"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdClose, MdMenu } from "react-icons/md";

export default function Nav() {
  const activeLink = "text-[#9867c5]";
  const normalLink = "text-gray-800 hover:text-[#9867c5] ";
  const Links = [
    { name: "Home", link: "/" },
    { name: "Add", link: "/add" },
  ];

  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className=" fixed z-50 top-0 left-0 w-full bg-white bg-opacity-85 p-2 border-b-2 border-[#9867c5]">
      <div className="md:flex items-center justify-between md:px-10 px-7 w-10/12 m-auto">
        <Link href="/">
         
            <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins]  pt-3 text-[#9867c5]">
              <h1>Profile Editing App</h1>
            </div>
         
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden text-[#9867c5] z-10"
        >
          {open ? <MdClose /> : <MdMenu />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-20  left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-14 bg-white bg-opacity-85 mt-2" : "top-[-490px] z-0"
          }`}
        >
          {Links.map((data) => (
            <li
              key={data?.name}
              className="md:ml-8 text-base font-bold md:my-0 my-7 cursor-pointer font-[Roboto]  text-lg "
            >
              <Link href={data?.link}>
                <div className={currentPath === data?.link ? activeLink : normalLink}>
                  {data?.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
