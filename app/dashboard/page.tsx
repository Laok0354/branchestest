"use client"

import {useState} from 'react'
import NavbarPrincipal from '@/components/NavbarPrincipal';
import SideNavbar from '@/components/SideBar';
import ProjectsScroll from '@/components/projects/ProjectsScroll';
import Link from 'next/link'

function DashBoard() {
    const [activeTab, setActiveTab] = useState('Your Projects');
    const [linePosition, setLinePosition] = useState(67);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenNavbar = () => {
        setIsOpen(!isOpen);
    }
  
    const handleTabClick = (tab : string) => {
      setActiveTab(tab);
      const element = document.getElementById(tab);
      if (element) {
        setLinePosition(element.offsetLeft);
      }
    }

    return (
        <main id = "__next" className='h-[full] w-full overflow-hidden'>
            <nav>
                <NavbarPrincipal />
                <SideNavbar 
                    page="Dashboard"
                    isOpen={isOpen}
                    handleOpenNavbar={handleOpenNavbar}
                    setActiveTab={setActiveTab}
                />  
            </nav>
              <section className=''>
                <section className="flex flex-col justify-center w-full">
                    <div className='flex justify-center align-middle items-center mt-[5.5rem] mr-6'>
                        <ul className='flex flex-row justify-around align-middle items-center w-4/12 relative'>
                            <li className='flex justify-center p-2 ml-1'>
                                <a href="#projects" onClick={() => handleTabClick('Your Projects')} id="Your Projects">
                                    Your Projects
                                </a>

                            </li>
                            <li className='flex justify-center p-2'>
                                <a href="#liked" onClick={() => handleTabClick('Liked Projects')} id="Liked Projects">
                                    Liked Projects
                                </a>
                            </li>
                            <div
                                className={`absolute bottom-0 left-0 h-1 bg-primaryv rounded-xl transition-transform transform translate-x-0`}
                                style={{ width: `${activeTab === 'Your Projects' ? '20%' : activeTab === 'Liked Projects' ? '22%' : '6%'}`, transform: `translateX(${linePosition + 1}px)` }}
                            />
                        </ul>
                    </div>
                </section>
                <section>
                    {activeTab === 'Your Projects' && (
                        <div>
                            <ProjectsScroll
                                amountProjects={12}
                                amountColumns={4}
                                className='w-fit mt-8'
                            />
                        </div>
                    )}
                    {activeTab === 'Liked Projects' && (
                        <div>
                            <ProjectsScroll
                                amountProjects={12}
                                amountColumns={4}
                                className='w-fit mt-8'
                            />
                        </div>
                    )}
                </section>
            </section>
        </main>
    );
}


export default DashBoard;
