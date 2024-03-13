"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function Navbar1() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("#search")! as HTMLInputElement;
    const inputValue = input.value;

    try {
      const response = await fetch(
        `http://localhost:3000/search/searchProject/${inputValue}`
      , {credentials: "include"});

      const projectsResults = await response.json();
      console.log(projectsResults);
      if (!response.ok) {
        console.log(projectsResults);
      }
    } catch (error) {}
  };

  return (
    <nav
      className={`fixed justify-evenly h-[80px] w-full flex flex-row items-center transition duration-300 ease-in-out ${
        scrolled
          ? "bg-zinc-950/90 shadow-[0_0_0_1px] shadow-primaryv"
          : "bg-transparent"
      }`}
    >
      <div className="flex flex-row items-center">
        <Image
          className="w-[140px] h-[50px]"
          src="/img/StartApp-Logo-lg.png"
          alt=""
          width={200}
          height={100}
        />
      </div>

      <ul className="flex flex-row list-none gap-[40px] text-[20px] items-center">
        <li className="ml-2 text-white/100 hover:text-white active:text-white/30">
          <Link href="/">Home</Link>
        </li>
        <li className="ml-2 text-white/70 hover:text-white active:text-white/30">
          <Link href="/about">About</Link>
        </li>
        <li className="ml-2 text-white/70 hover:text-white active:text-white/30">
          <Link href="/about">Contact</Link>
        </li>
        <div className="relative flex w-[300px] h-12 gap-4 items-center p-3 border-[1px] border-primaryv rounded-full hover:shadow-[0_0_0_1px] hover:shadow-primaryv active:shadow-primaryv/30 active:border-primaryv/30">
          <form onSubmit={handleSubmit} className="flex items-start gap-3">
            <button type="submit">
              <Image
                className="w-8 h-8 opacity-50 hover:opacity-100 active:opacity-30"
                src="/svg/search.svg"
                alt=""
                width={200}
                height={100}
              />
            </button>
            <input
              type="text"
              id="search"
              className="w-[300px] h-8 bg-transparent text-white outline-none"
              placeholder="Search"
            />
          </form>
        </div>
      </ul>

      <div className="flex flex-row list-none gap-[40px] text-[20px] items-center">
        <Image
          className="w-[3px] h-[46px]"
          src="/img/palito.png"
          alt=""
          width={200}
          height={100}
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

export default Navbar1;
