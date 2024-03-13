'use client'
import React, { useState, useEffect } from "react";

const ScrollButton = () => {
    const handleScroll = () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    };
  
    return (
      <button className="font-red text-[21px] text-center text-primaryv hover:text-primaryv/70 active:text-primaryv/30 w-[170px] h-[55px] rounded-[35px] flex justify-center items-center underline" onClick={handleScroll}>Learn About
      </button>
    );
  };
  
  export default ScrollButton;