import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import checkUserLogin from "./checkUserLogin"

interface NavbarPrincipalProps{
  page : String
}

function NavbarPrincipal ({page} : NavbarPrincipalProps) {
  const isLoggedIn = checkUserLogin();

    return (
    <nav className="bg-black border-b-2 border-[#1C1C1C] fixed justify-evenly h-[80px] w-full flex flex-row items-center">
          <div className="flex flex-row items-center gap-[80px] mr-52">
          <Image className= 'w-14 h-14 px-20 opacity-0'
            src="/svg/menu.svg"
            alt=""
            width = {200}
            height= {100}
          />
          <button>
            <Link href="/"><Image className= 'w-[140px] h-[50px]'
            src="/svg/StartApplogoWHITE.svg"
            alt=""
            width = {200}
            height= {100}
            />
            </Link>
          </button>
          </div>

          <div className="flex flex-row items-center gap-[80px] ml-56">
          <Image className= 'w-[3px] h-[46px]'
            src="/img/palito.png"
            alt=""
            width = {200}
            height= {100}
            />
          </div>

          <div className="flex flex-row items-center gap-[40px] mr-10">
            <Link className={"" + (page == "Notifications" ? "opacity-100" : "opacity-50 hover:opacity-70 active:opacity-30")} href={isLoggedIn ? "notifications" : "login"}>
              <Image className= 'w-12 h-12'
                src="/svg/notification.svg"
                alt=""
                width = {200}
                height= {100}
              />
            </Link>          

            <Link className={"" + (page == "Profile" ? "opacity-100" : "opacity-50 hover:opacity-70 active:opacity-30")} href={isLoggedIn ? "profile" : "login"}>
            <Image className= 'w-10 h-10'
            src="/svg/user.svg"
            alt=""
            width = {200}
            height= {100}
            />
          </Link>

          </div>
      </nav>
    )
}
export default NavbarPrincipal;

