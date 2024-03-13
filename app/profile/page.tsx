"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarPrincipal from "@/components/NavbarPrincipal";
import SideNavbar from "@/components/SideNavbar";
import checkUserLogin from "@/components/checkUserLogin"

interface Skill {
  name: string;
}

interface Project {
  project: {
  name: string;
  };
}

interface UserProfile {
  id: number;
  email: string;
  userName: string;
  about: string;
  skills: Skill[];
  projects: Project[];
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    };

    const [user, setUser] = useState<UserProfile>({
      id: 0,
      email: "",
      userName: "",
      about: "",
      skills: [],
      projects: [],
    });

  const [inputDisabled, setInputDisabled] = useState(true);

    const isLoggedIn = checkUserLogin();
    if (isLoggedIn === false){
    window.location.href = "/login";}

  useEffect(() => {
    fetch("http://localhost:3000/user",
    {
      credentials: "include"
    })
      .then((response) => response.json())
      .then((userData: UserProfile) => {
        setUser({
          ...userData,
          skills: userData.skills.map((skill) => ({ name: skill.name })) ,
          projects: userData.projects.map((project) => ({
            project: { name: project.project.name },
          })),
        });
        console.log(userData)
      });
  }, []);

  const toggleInput = () => {
    setInputDisabled(!inputDisabled);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  
    return(
        <>
        <main className="bg-[#0A090B] h-screen w-screen overflow-y-auto">
         <section className="bg-[#0A090B] h-screen w-screen">
           <header><NavbarPrincipal page="Profile"/></header>
           <button onClick={toggleNavbar}>
             <Image className= 'absolute top-3 left-24 w-14 h-14 opacity-50 hover:opacity-100 active:opacity-30'
               src="/svg/menu.svg"
               alt=""
               width = {200}
               height= {100}
              />
            </button>
            <SideNavbar isOpen={isOpen} toggleNavbar={toggleNavbar} page=""/>
            <section className="w-screen h-80 border-b-2 border-b-white shadow-lg bg-[#0A090B]">
              <div className="flex flex-col justify-start pt-32 pl-40 gap-4">
               <h1 className="w-40 -ml-20 text-[50px] text-transparent bg-clip-text bg-gradient-to-r from-primaryp to-white to-80%">Profile</h1>
               <div>
                 <Image className= 'w-40 h-40'
                  src="/svg/sin-foto.svg"
                  alt=""
                  width = {200}
                  height= {100}
                 />
                </div>
              </div>
            </section>
              <section className="flex flex-col justify-center items-center gap-10 pb-10 bg-gradient-to-br from-primaryp from-50% to-primaryv">
                <form className="w-[780px] flex flex-col justify-center items-center gap-10 p-10 mt-20 rounded-xl bg-[#0A090B] shadow-2xl">
                  <div>
                    <h3 className="text-xl pb-2 font-semibold">NAME</h3>
                    <input
                     name="name"
                     title="name"
                     value={user.userName}
                     className={`w-[650px] h-10 pl-2 py-6 text-xl text-white rounded-xl focus:outline-6 focus:outline-primaryv transition-color duration-200 ${
                      inputDisabled ? "bg-transparent placeholder:text-white/0" : "bg-[#1C1C1C] hover:bg-[#363636] placeholder:text-white/70"}`}
                     placeholder="Enter your name"
                     onChange={handleChange}
                     disabled = {inputDisabled}
                    />
                  </div>
                  <div>
                   <h3 className="text-xl pb-2 font-semibold">EMAIL</h3>
                   <input
                    name="email"
                    title="email"
                    value={user.email}
                    className={`w-[650px] h-10 pl-2 py-6 text-xl text-white rounded-xl focus:outline-6 focus:outline-primaryv transition-color duration-200 ${
                      inputDisabled ? "bg-transparent placeholder:text-white/0" : "bg-[#1C1C1C] hover:bg-[#363636] placeholder:text-white/70"}`}
                    placeholder="Enter your email"
                    onChange={handleChange}
                    disabled = {inputDisabled}
                   />
                  </div>
                  <div>
                   <h3 className="text-xl pb-2 font-semibold">SKILLS</h3>
                   <textarea
                     className={`w-[650px] h-auto pl-2 py-6 text-xl text-white rounded-xl focus:outline-6 focus:outline-primaryv transition-color duration-200 ${
                      inputDisabled ? "bg-transparent placeholder:text-white/0" : "bg-[#1C1C1C] hover:bg-[#363636] placeholder:text-white/70"}`}
                     placeholder="Enter your skills and knowledge"
                     name = "skills"
                     title="skills"
                     value={user.skills.map((skill) => skill.name).join(', ')}
                     onChange={handleChange}
                     disabled = {true}
                   />
                  </div>
                  <div>
                   <h3 className="text-xl pb-2 font-semibold">ABOUT</h3>
                   <textarea
                     className={`w-[650px] h-40 pl-2 py-6 text-xl rounded-xl text-white focus:outline-6 focus:outline-primaryv transition-color duration-200 ${
                      inputDisabled ? "bg-transparent placeholder:text-white/0" : "bg-[#1C1C1C] hover:bg-[#363636] placeholder:text-white/70"}`}
                     placeholder="Important things about you"
                     name = "about"
                     title="about"
                     value={user.about}
                     onChange={handleChange}
                     disabled = {inputDisabled}
                   />
                  </div>
                  <div>
                   <h3 className="text-xl pb-2 font-semibold">PROJECTS</h3>
                    <textarea
                      className={`w-[650px] h-40 pl-2 py-6 text-xl rounded-xl text-white focus:outline-6 focus:outline-primaryv transition-color duration-200 ${
                        inputDisabled ? "bg-transparent placeholder:text-white/0" : "bg-[#1C1C1C] hover:bg-[#363636] placeholder:text-white/70"}`}
                     placeholder="Enter the projects you are in"
                     name = "projects"
                     title="projects"
                     value={user.projects.map((project) => project.project.name).join(', ')}
                     onChange={handleChange}
                     disabled = {true}
                   />
                  </div>
                </form>
{/*                 <div>
                   <button className={`w-96 h-12 font-bold rounded-[5px] bg-white hover:text-white hover:bg-white/0 hover:border-2 shadow-xl ${
                     inputDisabled ? "text-primaryv hover:border-primaryv" : "text-primaryp hover:border-primaryp"
                     }`} 
                     onClick={toggleInput}>{inputDisabled ? 'Edit Profile' : 'Save Changes'}
                   </button>
                  </div>  */}
              </section>
          </section>
        </main>
        </>
        )
}
