"use client"

import LikeDislikeButton from "./LikeButton"
import OpenedProject from "./OpenedProject-Collaborator"
import constants from "./constants"
import { useState, useEffect } from "react"
import Modal from "react-modal";
import { Project, ProjectCollaborators } from ".prisma/client"

const Projects = (
    {
        id,
        title, 
        description,
        members,
        joined,
        stateText,
        liked,
        setLikedProjectsIds,
        } : {
        id : number,
        title : string,
        description : string
        members : number,
        joined : number,
        stateText : string,
        liked: boolean,
        setLikedProjectsIds: React.Dispatch<React.SetStateAction<Set<unknown>>>,
    }) => {
      useEffect(() => {
        Modal.setAppElement("#__next");
      }, []);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let stateTextColor;

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleLike = () => {
        setLikedProjectsIds((prevLikedProjectsIds) => {
          const newLikedProjectsIds = new Set(prevLikedProjectsIds);
          if (liked) {
            newLikedProjectsIds.delete(id);
          } else {
            newLikedProjectsIds.add(id);
          }
          return newLikedProjectsIds;
        });
  
          fetch(`http://localhost:3000/userInteractions/like/${id}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: "include",
          })
            .then((response) => {
               if (response.status === 401) {
                  window.location.href = '/login';
                  return Promise.reject('Unauthorized');
                }
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .catch((error) => {
              console.error('Error liking project:', error);
            });
              };

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 999,
        },
            content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
            width: "70%",
            height: "70%",
            overflow: "auto",
            background: "#0D1117",
            border: "1px solid #9F00FB",
            padding: "0px",
        },
      };
      

        if (stateText === "In Progress") {
            stateTextColor = " text-orange";
        } else if (stateText === "Finished") {
            stateTextColor = " text-green";
        } else if (stateText === "Abandoned") {
            stateTextColor = " text-red";
        } else {
            stateTextColor = " text-purple-500";
        }

    return (
    <article>
        <section className="flex align-middle justify-center">
            <div className="py-4 px-4 bg-gray-800 w-40 h-60 rounded-xl flex flex-col justify-between border-2 border-primaryv">
                <div>  
                    <h1 onClick={openModal} className="text-[1rem] font-semibold font-raleway cursor-pointer">{title}</h1>
                    <p className="text-xs text-[#8F8F8F]">{description}</p>
                </div>
                <div className="mt-2">
                    <h3 className="text-sm mb-1 font-semibold text-primaryv">Members: <span className="text-white font-normal">{members}</span></h3>
                    <h3 className="text-sm mb-1 font-semibold text-primaryv">Joined: <span className="text-white font-normal">{joined}</span></h3>
                    <h3 className={`text-sm font-bold mt-4 ${stateTextColor}`}>{stateText}</h3>
                </div>
                <div className="">
                    <div className="flex flex-row justify-end mt-3">
                        <LikeDislikeButton
                            filled={constants.likeFilledPath}
                            notFilled={constants.likeNotFilledPath}
                            liked={liked}
                            handleLike={handleLike}
                        />
                    </div>
                </div>
            </div>
        </section>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
           <OpenedProject
                id={id}
                title={title}
                description={description}
                members={members}
                joined={joined}
                closeModal={closeModal}
                discordLink="Your Discord link goes here"
           />
        </Modal>
    </article>
    );
}

const ProjectsScroll = ({ 
    amountColumns,
    className
} : { 
    amountColumns : number
    className : string
}) => {
    const [myProjects, setMyProjects] = useState([]);
    const [error, setError] = useState(null);
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    const [likedProjects, setLikedProjects] = useState([]);
    const [likedProjectsIds, setLikedProjectsIds] = useState(new Set());
    const stateText = ["0", "In Progress", "Finished", "Abandoned", "Paused"];

    useEffect(() => {
        fetch(`http://localhost:3000/userInteractions/getLiked`, {
          credentials: "include",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setLikedProjects(data);
            setLikedProjectsIds(new Set(data.map((project: Project) => project.id)));
          })
          .catch((error) => {
            console.error('Error fetching liked projects:', error);
          });
      }, []);

      useEffect(() => {
          fetch(`http://localhost:3000/project/getMyProjects`, {
            credentials: "include",
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              setMyProjects(data);
              setInitialDataLoaded(true);
            })
            .catch((error) => {
              setError(error.message);
            });
    
      }, []);

      return (
        <section className="overflow-hidden w-full flex justify-center">
          <div className={`max-h-[500px] overflow-y-auto grid grid-cols-${amountColumns} gap-4 px-2 ${className}`}>
            {myProjects.map((project: Project & { collaborators: ProjectCollaborators[] }) => (
              <div className="col-span-1" key={project.id}>
                <Projects
                  id={project.id}
                  title={project.name}
                  description={project.description}
                  members={project.maxMembers}
                  joined={project.collaborators.length}
                  stateText={stateText[project.statusId]}
                  liked={likedProjectsIds.has(project.id)}
                  setLikedProjectsIds={setLikedProjectsIds}
                />
              </div>
            ))}
          </div>
        </section>
      );
    };

export default ProjectsScroll;