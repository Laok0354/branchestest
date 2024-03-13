"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarPrincipal from "./Navbar-SearchBar";

interface SideNavbarProps {
  page: string;
  isOpen: boolean;
  handleOpenNavbar: () => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({
  page,
  isOpen,
  handleOpenNavbar
}: SideNavbarProps) => {
  return (
    <main>
      <nav
        className={`fixed top-20 bg-black h-full border-r-2 border-[#1C1C1C] drop shadow-lg block transition-all duration-700 ${
          isOpen ? "w-[250px]" : "w-[100px]"
        }`}
      >
        <div className="flex justify-end items-baseline">
          <div className=" flex flex-col top-0 mr-2">
            <button
              onClick={handleOpenNavbar}
              className="bg-none border-0 cursor-pointer w-[60px] h-[60px] p-0"
            >
              <span
                className={`rounded-[5px] bg-white/70 block w-[40%] mt-[5px] mb-[auto] h-[2px] transition-all duration-700 ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              ></span>
              <span
                className={`rounded-[5px] block w-[40%] mt-[5px] mb-[auto] h-[2px] transition-all ${
                  isOpen
                    ? "bg-none bg-transparent"
                    : "bg-white/70 duration-1000"
                }`}
              ></span>
              <span
                className={`rounded-[5px] bg-white/70 block w-[40%] mt-[5px] mb-[auto] h-[2px] transition-all duration-700 ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
        <div
          className={
            "flex items-center py-7 pl-7 gap-4 hover:opacity-100 active:opacity-30 hover:text-white active:text-white/30 " +
            (page == "Dashboard" ? "text-white" : "text-white/70 opacity-50")
          }
        >
          <Link href="dashboard">
            <button className="flex flex-row items-center text-[20px]">
              <Image
                className=""
                src="/svg/house.svg"
                alt=""
                width={25}
                height={25}
              />
              <p
                className={`pl-3 transition-all ${
                  isOpen ? "duration-1000" : "text-transparent duration-200 w-1"
                }`}
              >
                {isOpen ? "Dashboard" : ""}
              </p>
            </button>
          </Link>
        </div>

        <div
          className={`flex items-center pb-8 pl-7 gap-4 hover:opacity-100 active:opacity-30 hover:text-white active:text-white/30 ${
            page == "Users" ? "text-white" : "text-white/70 opacity-50"
          } `}
        >
          <Link href="users">
            <button className="flex flex-row items-center text-[20px]">
              <Image
                className=""
                src="/svg/person.svg"
                alt=""
                width={25}
                height={25}
              />
              <p
                className={`pl-3 transition-all ${
                  isOpen ? "duration-1000" : "text-transparent duration-200"
                }`}
              >
                {isOpen ? "Users" : ""}
              </p>
            </button>
          </Link>
        </div>

        <div
          className={
            "flex pb-8 pl-7 gap-4  hover:opacity-100 active:opacity-30 hover:text-white active:text-white/30 " +
            (page == "Projects" ? "text-white" : "text-white/70 opacity-50")
          }
        >
          <Link href="projects">
            <button className="flex flex-row text-[20px]">
              <Image
                className=""
                src="/svg/idea.svg"
                alt=""
                width={25}
                height={25}
              />
              <p
                className={`pl-3 transition-all ${
                  isOpen ? "duration-1000" : "text-transparent duration-200"
                }`}
              >
                {isOpen ? "Projects" : ""}
              </p>
            </button>
          </Link>
        </div>

        <div
          className={
            "flex items-center pb-8 pl-7 gap-4 hover:opacity-100 active:opacity-30 hover:text-white active:text-white/30 " +
            (page == "Your Projects"
              ? "text-white"
              : "text-white/70 opacity-50")
          }
        >
          <Link href="./dashboard">
            <button className="flex flex-row items-center text-[20px]">
              <Image
                className=""
                src="/svg/folder.svg"
                alt=""
                width={25}
                height={25}
              />
              <p
                className={`pl-[2.30rem] absolute flex justify-start transition-all w-64 ${
                  isOpen
                    ? "duration-1000"
                    : "text-transparent absolute duration-200"
                }`}
              >
                {isOpen ? "Your Projects" : ""}
              </p>
            </button>
          </Link>
        </div>

        <div
          className={
            "flex items-center pb-8 pl-7 gap-4 hover:opacity-100 active:opacity-30 hover:text-white active:text-white/30 " +
            (page == "Liked" ? "text-white" : "text-white/70 opacity-50")
          }
        >
          <Link href="/dashboard">
            <button className="flex flex-row items-center text-[20px]">
              <Image
                className=""
                src="/svg/corazon.svg"
                alt=""
                width={25}
                height={25}
              />
              <p
                className={`pl-3 transition-all ${
                  isOpen ? "duration-1000" : "text-transparent duration-200"
                }`}
              >
                {isOpen ? "Liked" : ""}
              </p>
            </button>
          </Link>
        </div>
      </nav>
    </main>
  );
};

export default SideNavbar;
