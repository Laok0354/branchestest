"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"

const MessageRequest = ({
    id,
    title,
    placeHolder,
    name,
    titleClassName,
    handleChange,
    valorTextarea,
    height
  }: {
    id: number
    title: string;
    placeHolder: string;
    name: string;
    titleClassName: string;
    handleChange: ( event : any ) => void;
    valorTextarea: string;
    height: number;
  }) =>{
    const [isInputSelected, setIsInputSelected] = useState(false);

    const handleInputFocus = () => {
        setIsInputSelected(true);
    }

    const handleInputBlur = () => {
        setIsInputSelected(false);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        fetch(`http://localhost:3000/userInteractions/sendCollaborationRequest/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({
            message: valorTextarea,
          }),
        })
          .then((response) => {
            if (response.status === 401) {
                window.location.href = '/login';
                return Promise.reject('You must be logged in to join a project');
              }
            return response.json();
          })
          .then((data) => {
            alert(data.message);
          })
          .catch((error) => {
          });
      };

    return(
        <>
            <section>
                <div className="my-2">
                    <h6 className={titleClassName}>{title}</h6>
                    <textarea
                        className={`${isInputSelected ? `outline-2 outline-primaryv transition-colors duration-200` : "outline-none"} w-80 h-${height} border rounded transition-all duration-300 py-2 px-2 whitespace-normal overflow-hidden overflow-ellipsis outline-none flex justify-center bg-gray-700 text-gray-50 p-2 placeholder:text-gray-50`}
                        name={name}
                        id=""
                        placeholder={placeHolder}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        value={valorTextarea}
                    />
                    <button className="flex justify-center items-center px-20 py-2 bg-primaryv rounded-lg h-12 mt-4 hover:bg-primaryv/70 mx-auto" 
                    onClick={handleSubmit}>
                        <h1 className="font-semibold">Join</h1>
                    </button>
                </div>
        </section>
    </>
    )
}

export default MessageRequest