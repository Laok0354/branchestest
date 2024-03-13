"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ProjectForm } from "../Forms";
import Image from "next/image";
import { Project } from "./Participant";

function CreateProjectModal() {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
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
      width: "80%",
      height: "80%",
      overflow: "auto",
      background: "#0D1117",
      border: "1px solid #9F00FB",
      padding: "0px",
    },
  };

  const handleCreateProject = ({ formData }: { formData: Project }) => {
    console.log(formData);
    closeModal();
  };

  return (
    <div>
      <div>
        <button
          className="flex justify-center items-center bg-gray-800 text-white p-[3.2rem] rounded-xl mt-8 border-2 border-primaryv"
          onClick={openModal}
        >
          <div className="flex flex-col justify-center items-center align-middle ">
            <h1 className="text-xl font-semibold">Create Your Own Project</h1>
            <Image
              src="/svg/create-project.svg"
              alt="Profile Picture"
              width={75}
              height={75}
              className="rounded-lg mt-4"
            />
          </div>
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <section className="divide-y divide-primaryv">
          <div className="p-2 flex flex-row justify-between items-center">
            <h2 className="">Create a Project</h2>
            <button className=" text-white p-2" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
          <div>
            <ProjectForm handleCreateProject={handleCreateProject} />
          </div>
        </section>
      </Modal>
    </div>
  );
}

export default CreateProjectModal;
