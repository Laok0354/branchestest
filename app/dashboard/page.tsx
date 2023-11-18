"use client"

import {useState} from 'react'
import NavbarPrincipal from '@/components/NavbarPrincipal-SearchBar';
import SideNavbar from '@/components/SideBar';
import Link from 'next/link'

function DashBoard() {
    const [activeTab, setActiveTab] = useState('Your Projects');
    const [linePosition, setLinePosition] = useState(71);
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
        <main>
            <nav>
                <NavbarPrincipal />
                <SideNavbar 
                    page="Dashboard"
                    isOpen={isOpen}
                    handleOpenNavbar={handleOpenNavbar}
                />  
            </nav>
              <section className='divide-x-4 divide-y-4'>
                <section className="flex flex-col justify-center">
                    <div className='flex justify-center'>
                        <h1 className="bg-gradient-to-r from-primaryv to-primaryp inline-block bg-clip-text text-[#00000000] text-4xl w-fit">
                            Dashboard
                        </h1>
                    </div>
                    <div className='flex justify-center align-middle items-center mt-12 mr-6'>
                        <ul className='flex flex-row justify-around align-middle items-center w-4/12 relative'>
                            <li className='flex justify-center p-2 ml-1'>
                                <a href="#" onClick={() => handleTabClick('Your Projects')} id="Your Projects">
                                    Your Projects
                                </a>
                            </li>
                            <li className='flex justify-center p-2'>
                                <a href="#" onClick={() => handleTabClick('Liked Projects')} id="Liked Projects">
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
            </section>
        </main>
    );
}


export default DashBoard;
