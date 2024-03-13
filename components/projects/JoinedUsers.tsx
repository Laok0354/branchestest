"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { UserData } from "./SuggestedUsers";

interface CollaboratorsData {
  user: UserData
}

const UserCard = ({
  username,
  userBio
}: {
  username: string;
  userBio: string;
}) => {
  return (
    <section className="flex flex-row justify-center items-center m-2">
      <Image
        src="/img/Default-Profile-Icon.jpg"
        alt="Profile Picture"
        width={30}
        height={30}
        className="rounded-lg mr-2"
      />
      <div className="flex justify-between w-48">
        <div className="flex flex-col">
          <h4 className="font-raleway text-xs">{username}</h4>
          <h6 className="font-light font-raleway text-gray-50 text-[0.65rem]">
            {userBio}
          </h6>
        </div>
      </div>
    </section>
  );
};

const JoinedUsers = ({
  id,
  members,
  joined,
}: {
  id: number;
  members: number;
  joined: number;
}) => {
  const [joinedData, setJoinedData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/project/getp/${id}`, {
      headers: {
        "Content-Type": "application/json",
    },
      credentials: "include"})
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const collaborators = data.project.collaborators;
        console.log(data.project.collaborators)
        const userCards = collaborators.map((user: CollaboratorsData, index: number) => {
          return <UserCard 
          key={index}
          username={user.user.userName}
          userBio={user.user.about}
          />;
        });
        setJoinedData(userCards);
      })
      .catch((error) => {
        fetch(`http://localhost:3000/project/getpUnlogged/${id}`,{
    credentials: "include"})
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const collaborators = data.project.collaborators;
        console.log(data.project.collaborators)
        const userCards = collaborators.map((user: CollaboratorsData, index: number) => {
          return <UserCard 
          key={index}
          username={user.user.userName}
          userBio={user.user.about}
          />;
        });
        setJoinedData(userCards);
      })
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (joinedData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="px-6 py-3 rounded-xl justify-start mt-8 w-[20rem] bg-gray-700 border border-primaryv">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="font-semibold mt-2 text-[1rem]">Joined Users</h1>
          <div className="flex flex-row">
            <h3 className="flex flex-row text-xs font-semibold">
              Vacants:
              <p className="font-normal ml-1 text-white">{members - joined}</p>
            </h3>
          </div>
        </div>
        <p className="text-gray-50 text-[0.6rem] mb-2 mt-2 hover:underline cursor-pointer">
          <Link href={"/users"}>See All</Link>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center flex-wrap mb-2 overflow-hidden">
      <article className={`flex flex-col justify-center mt-4 ${joinedData.length > 4 ? "max-h-[200px] overflow-y-auto px-2" : ""}`}>
        {joinedData}
        </article>
      </div>
    </section>
  );
};

export default JoinedUsers;
