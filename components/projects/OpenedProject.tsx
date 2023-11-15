"use client"

import JoinedUsers from "./JoinedUsers";
import MessageRequest from "./MessageRequest"
import { useState } from "react";

const OpenedProject = ({
    id,
    title, 
    description,
    members,
    joined,
    } : {
    id: number
    title : string | number,
    description : string
    members : number,
    joined : number,
}) => {
    const [valorTextarea, setValorTextarea] = useState('');
    const [height, setHeight] = useState(10);

    const handleChange = (event) => {
        setValorTextarea(event.target.value);
        handleKeyPress(valorTextarea);
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
  
    return (
        <section>
            <div className="flex flex-col justify-center items-center w-full mt-2">
                <h1 className="text-3xl font-raleway font-semibold">{title}</h1>
                <h2 className="text-xl">{description}</h2>
            </div>
            <section className="grid grid-col-3 ">
                <div className="grid col-start-3 row-start-2">
                    <JoinedUsers
                        id={id}
                        members={members}
                        joined={joined}
                    />
                </div>
                <div className="flex justify-center flex-col items-center col-start-1 row-start-2 ml-16">
                    <MessageRequest
                        id={id}
                        title="Send a Message"
                        name="message"
                        placeHolder="Send a Message"
                        titleClassName="mb-1 px-2"
                        valorTextarea={valorTextarea}
                        handleChange={handleChange}
                        height={height}
                    />
{/*                     <button className="flex justify-center items-center px-20 py-2 bg-primaryv rounded-lg h-12 mt-4 hover:bg-primaryv/70">
                        <h1 className="font-semibold">Join</h1>
                    </button> */}
                </div>
                <div>
                    {/* Posibilidad para poner un link de discord */}
                </div>
            </section>
        </section>
 )}

export default OpenedProject;