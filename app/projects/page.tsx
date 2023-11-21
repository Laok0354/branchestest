"use client"

import ProjectsScroll from "../../components/projects/ProjectsScroll";
import SuggestedUsers from "../../components/projects/SuggestedUsers";
import CreateProject from "@/components/projects/CreateProject";
import NavbarPrincipal from '@/components/NavbarPrincipal-SearchBar';
import SideNavbar from "@/components/SideBar";
import { useState } from "react";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);

    const handleOpenNavbar = () => {
        setIsOpen(!isOpen);
    }
  return (
    <article id="__next" className="">
      <header className="">
        <NavbarPrincipal />
        <SideNavbar 
          page="Projects" 
          isOpen={isOpen}
          handleOpenNavbar={handleOpenNavbar}
        />
      </header>
      <section className="flex flex-row justify-around items-center flex-grow mt-[6.5rem]">
        <div className={`mt-4 transition-all duration-700 ${isOpen ? "ml-52" : ""}`}>
          <ProjectsScroll 
            amountProjects={24}
            amountColumns={3}
            className=""
          />
        </div>
        <div className="">
          <SuggestedUsers />
          <CreateProject />
        </div>
      </section>
    </article>
  );
}
