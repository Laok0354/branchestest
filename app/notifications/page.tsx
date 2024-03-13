"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavbarPrincipal from "@/components/NavbarPrincipal";
import SideNavbar from "@/components/SideNavbar";
import Notifications from "@/components/Notifications";
import checkUserLogin from "@/components/checkUserLogin"


interface NProps {
  estate: String;
}

interface NotifDataProps {
  id: number;
  userId: number;
  projectId: number;
  createdAt: string;
  status: string;
  message: string;
  user: {
    userName: string;
  };
  project: {
    name: string;
  };
}

export default function Home({ estate }: NProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifsResults, setNotifsResults] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

    const isLoggedIn = checkUserLogin();
    if (isLoggedIn === false){
    window.location.href = "/login";}

  useEffect(() => {
      fetch(`http://localhost:3000/userInteractions/getCollaborationRequests`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        credentials: "include"
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setNotifsResults(data);
        })
        .catch((error) => {
          console.log(`Error fetching notifications: ${error}`);
        });
      }, []);

  const handleTabClick = (tab : string) => {
    setActiveTab(tab);
    console.log(activeTab);
  };


  return (
    <>
      <header>
        <NavbarPrincipal page="Notifications"/>
      </header>

      <main className="bg-gradient-to-br from-primaryv from-50% to-primaryp h-screen w-screen overflow-hidden">
        <button onClick={toggleNavbar}>
          <Image
            className="absolute top-3 left-24 w-14 h-14 opacity-50 hover:opacity-100 active:opacity-30"
            src="/svg/menu.svg"
            alt=""
            width={200}
            height={100}
          />
        </button>
        <SideNavbar isOpen={isOpen} page="" toggleNavbar={toggleNavbar} />

        <section className="w-screen bg-[#0A090B] h-80 border-b-2 border-b-white shadow-lg">
          <div className="w-screen flex gap-96">
            <h1 className="pl-[87px] pt-32 text-transparent text-[50px] font-red bg-clip-text bg-gradient-to-r from-primaryv to-white to-90% static">
              Notifications
            </h1>
          </div>

          <ul className="flex flex-row list-none gap-[40px] text-[20px] items-center mt-16">
            <li
              className={`hover:text-white active:text-white/30 ml-[95px] px-[5px] ${
                activeTab === "All" ? " text-white " : " text-white/70"
              }`}
            >
              <a href="#" onClick={() => handleTabClick("All")}>
                All
              </a>
            </li>
            <li
              className={`hover:text-white active:text-white/30 ${
                activeTab === "Unread" ? " text-white " : "text-white/70"
              }`}
            >
              <a href="#" onClick={() => handleTabClick("Unread")}>
                Unread
              </a>
            </li>
            <li
              className={`hover:text-white active:text-white/30 ${
                activeTab === "Accepted" ? " text-white " : " text-white/70"
              }`}
            >
              <a href="#" onClick={() => handleTabClick("Accepted")}>
                Accepted
              </a>
            </li>
            <li
              className={`hover:text-white active:text-white/30 ${
                activeTab === "Declined" ? " text-white " : " text-white/70"
              }`}
            >
              <a href="#" onClick={() => handleTabClick("Declined")}>
                Declined
              </a>
            </li>
            <div
              className={`absolute mt-7 h-1 bg-primaryv rounded-xl transition-transform transform duration-200 ${isOpen ? "bg-transparent" : ""} ${
                activeTab === "All"
                  ? "w-[2.5%] translate-x-[6rem]"
                  : activeTab === "Unread"
                  ? "w-[5.5%] translate-x-[10.3rem]"
                  : activeTab === "Accepted"
                  ? "w-[7%] translate-x-[16.55rem]"
                  : activeTab === "Declined"
                  ? "w-[6.5%] translate-x-[24.3rem]"
                  : "w-[6%]"
              } ${
                activeTab === "All"
                  ? "translate-x-0"
                  : activeTab === "Unread"
                  ? "translate-x-[95px]"
                  : activeTab === "Declined"
                  ? "translate-x-[190px]"
                  : activeTab === "Accepted"
                  ? "translate-x-[285px]"
                  : "translate-x-0"
              }`}
            />
          </ul>
        </section>
        <section className="w-full h-60 ml-24 bg-transparent">
          {activeTab === "All" && (
              <div className={notifsResults.length > 3 ? "max-h-[340px] overflow-y-auto px-8" : ""}>
                {notifsResults.map((notifData: NotifDataProps) => (
                  <div className="col-span-1" key={notifData.id}>
                    <Notifications
                      notifId={notifData.id}
                      nameUser={notifData.user.userName}
                      nameProject={notifData.project.name}
                      notifMessage={notifData.message}
                      notifStatus={notifData.status}
                    />
                  </div>
                ))}
            </div>
            )}
            {activeTab === "Unread" && (
              <div className={notifsResults.length > 3 ? "max-h-[340px] overflow-y-auto px-8" : ""}>
                {notifsResults.filter((notifData : NotifDataProps) => notifData.status === "pending").map((notifData : NotifDataProps) => (
                  <div className="col-span-1" key={notifData.id}>
                    <Notifications
                      notifId={notifData.id}
                      nameUser={notifData.user.userName}
                      nameProject={notifData.project.name}
                      notifMessage={notifData.message}
                      notifStatus={notifData.status}
                    />
                  </div>
                ))}
            </div>
            )}
            {activeTab === "Accepted" && (
              <div className={notifsResults.length > 3 ? "max-h-[340px] overflow-y-auto px-8" : ""}>
              {notifsResults.filter((notifData : NotifDataProps) => notifData.status === "accepted").map((notifData : NotifDataProps) => (
                <div className="col-span-1" key={notifData.id}>
                  <Notifications
                    notifId={notifData.id}
                    nameUser={notifData.user.userName}
                    nameProject={notifData.project.name}
                    notifMessage={notifData.message}
                    notifStatus={notifData.status}
                  />
                </div>
              ))}
          </div>
            )}
            {activeTab === "Declined" && (
              <div className={notifsResults.length > 3 ? "max-h-[340px] overflow-y-auto px-8" : ""}>
              {notifsResults.filter((notifData : NotifDataProps) => notifData.status === "rejected").map((notifData : NotifDataProps) => (
                <div className="col-span-1" key={notifData.id}>
                  <Notifications
                    notifId={notifData.id}
                    nameUser={notifData.user.userName}
                    nameProject={notifData.project.name}
                    notifMessage={notifData.message}
                    notifStatus={notifData.status}
                  />
                </div>
              ))}
          </div>
            )}
        </section>
      </main>
    </>
  );
}
