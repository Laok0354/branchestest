"use client"

import JoinedUsers from "./JoinedUsers";
import MessageRequest from "./MessageRequest"
import { useState } from "react";
import { Input } from "../Forms";

const OpenedProject = ({
    id,
    title, 
    description,
    members,
    joined,
    closeModal,
    discordLink
    } : {
    id : number
    title : string,
    description : string
    members : number,
    joined : number,
    closeModal : () => void,
    discordLink : string
}) => {
    const [valorTextarea, setValorTextarea] = useState('');
    const [height, setHeight] = useState(10);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [isInputSelected, setIsInputSelected] = useState(false);
    const [formData, setFormData] = useState({
        name: title || "",
        description: description || "",
        discordLink: discordLink || ""
      });

    const handleInputFocus = () => {
        setIsInputSelected(true);
    }

    const handleInputBlur = () => {
        setIsInputSelected(false);
    }  

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValorTextarea(event.target.value);
        handleKeyPress(valorTextarea);
        setFormData({ ...formData, [name]: value });
    };

    const toggleInput = () => {
        setInputDisabled(!inputDisabled);
      };

    const handleKeyPress = (valorTextarea : string) => {
        if (valorTextarea.length > 100) {
            setHeight(32);
        }
        else if (valorTextarea.length > 40) {
            setHeight(16);
        }
        else{
            setHeight(10);
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setInputDisabled(!inputDisabled)
        if (formData.name === "" || formData.description === "") {
            alert("All fields must be filled.");
        } else {
            console.log("ID:", id, "Datos del formulario:", formData);
            fetch(`http://localhost:3000/project/modify/${id}`, {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description
            }),
              })
                .then((response) => {
                  if (!response.ok) {
                    return response.json().then((data) => {
                      console.log(data);
                      throw new Error(`Server error: ${data.message}`);
                    });
                  }
                  return response.json();
                })
        }
    }
  
    return (
        <section className="">
            <section className="mt-12">
                <section className="grid grid-col-3 ">
                    <div className="grid col-start-3 row-start-2 ">
                        <JoinedUsers
                            id={id}
                            members={members}
                            joined={joined}
                        />
                    </div>
                    <div className="flex justify-center flex-col items-center col-start-1 row-start-2 ml-16">
                        <form 
                            action="" 
                            className="flex flex-col justify-center items-center"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col justify-center items-center w-full h-fit mt-4">
                                <Input
                                    title=""
                                    name="name"
                                    placeHolder=""
                                    className={`text-center text-3xl font-raleway font-semibold transition-color duration-200 text-white ${inputDisabled ? "bg-transparent placeholder:text-white" : ""}`}
                                    onChange={handleChange}
                                    titleClassName=""
                                    value={formData.name}
                                    disabled={inputDisabled}
                                />
                                <textarea
                                    className={`${isInputSelected ? ` outline-2 outline-primaryv transition-colors duration-200` : "outline-none"} text-xl w-80 h-20 rounded text-center transition-all duration-300 px-2 font-semibold bg-gray-700 text-gray-50 placeholder:text-gray-50 outline-none ${inputDisabled ? "bg-transparent outline-none" : ""}`}
                                    name="description"
                                    id=""
                                    placeholder=""
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    value={formData.description}
                                    disabled={inputDisabled}
                                />
                                <Input
                                    title=""
                                    name="discordLink"
                                    placeHolder="Your Discord link goes here"
                                    className={`text-center text-[0.9rem] font-raleway font-semibold transition-color duration-200 ${inputDisabled ? "bg-transparent placeholder:text-white/0" : ""}`}
                                    onChange={handleChange}
                                    titleClassName=""
                                    value={formData.discordLink}
                                    disabled={inputDisabled}
                                />
                            </div>
                            <button type="button" className={`w-48 h-12 font-bold rounded-[5px] bg-primaryv text-white hover:bg-white/10 hover:border-2 shadow-xl hover:border-primaryv`} 
                                onClick={inputDisabled ? toggleInput : handleSubmit}>{inputDisabled ? 'Edit Project' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </section>
            </section>
        </section>
 )}

export default OpenedProject;