'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  page : String
}

function Navbar({page} : IProps) {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("#search")! as HTMLInputElement;
    const inputValue = input.value;
  }

  return (
    <nav
      className={`fixed justify-evenly h-[80px] w-full flex flex-row items-center transition duration-300 ease-in-out ${
        scrolled ? "bg-zinc-950/90 shadow-[0_0_0_1px] shadow-primaryv" : "bg-transparent"
      }`}
    >
      <div className="flex flex-row items-center">
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

        <ul className = "flex flex-row list-none gap-[40px] text-[20px] items-center">
          <li className={"ml-2 hover:text-white active:text-white/30 " + (page == "Home" ? "text-white" : "text-white/70")} ><Link href="/">Home</Link></li>
          <li className={"ml-2 hover:text-white active:text-white/30 " + (page == "Projects" ? "text-white" : "text-white/70")} ><Link href="/projects">Projects</Link></li>
          <li className={"ml-2 hover:text-white active:text-white/30 " + (page == "About" ? "text-white" : "text-white/70")} ><Link href="/about">About</Link></li>
          <li className={"ml-2 hover:text-white active:text-white/30 " + (page == "Contact & Terms" ? "text-white" : "text-white/70")} ><Link href="/contact">Contact & Terms</Link></li>
          
        </ul>

        <div className="flex flex-row list-none gap-[40px] text-[20px] items-center">
        <Image className= 'w-[3px] h-[46px]'
            src="/img/palito.png"
            alt=""
            width = {200}
            height= {100}
        />
          <div>
           <button className="ml-5 text-primaryv/70 py-[10px] px-[30px] text-[20px] rounded-[17px] justify-center items-center border border-primaryv hover:shadow-[0_0_0_1px] hover:shadow-primaryv hover:text-primaryv active:text-primaryv/30 active:shadow-primaryv/30 active:border-primaryv/30">
           <Link href="/signup">Sign Up</Link>
          </button>

          <button className="ml-2 text-white/70 hover:text-white active:text-white/30 border border-transparent hover:border-white active:border-white/30 py-[10px] px-[30px] text-[20px] rounded-[17px] justify-center items-center">
           <Link href="/login">Log In</Link>
          </button>
          </div>
        </div> 
      </nav>
  );
}

export default Navbar;
