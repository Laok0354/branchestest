"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from './NumberInput.module.css'
import Link from "next/link";
import MultiSelectInput from "./sign-up/MultiSelectInput";
import Icons from "./sign-up/Icons";
import OptionsMenu from "./projects/OptionsMenu";
import { Project } from "./projects/Participant";

const Input = ({
  title,
  placeHolder,
  name,
  value,
  className,
  titleClassName,
  onChange,
  disabled
}: {
  title: string;
  placeHolder: string;
  name: string;
  value: string;
  className: string;
  titleClassName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean
}) => {
  const [isInputSelected, setIsInputSelected] = useState(false);

  const handleInputFocus = () => {
    setIsInputSelected(true);
  }

  const handleInputBlur = () => {
    setIsInputSelected(false);
  }

  return (
    <div className="my-2">
      <h6 className={titleClassName}>{title}</h6>
      <input
        className={`${isInputSelected ? "outline-2 outline-primaryv transition-colors duration-200" : "outline-none"} outline-none transition-all duration-300 flex justify-center w-80 h-12 rounded-md bg-gray-700 text-gray-50 p-2 placeholder:text-gray-50 ${className}`}
        type="text"
        name={name}
        value={value}
        id=""
        placeholder={placeHolder}
        onChange={onChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </div>
  );
};

const PasswordInput = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isInputSelected, setIsInputSelected] = useState(false);

  const handleInputFocus = () => {
    setIsInputSelected(true);
  }

  const handleInputBlur = () => {
    setIsInputSelected(false);
  }

  const handleClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="my-2">
      <h6 className="text-xs font-semibold tracking-widest">PASSWORD</h6>
      <div className="flex flex-row relative justify-between">
        <input
          className={`${isInputSelected ? "outline-2 outline-primaryv transition-colors duration-200" : "outline-none"} outline-none flex justify-center mt-1 w-80 h-12 rounded-md bg-gray-700 text-gray-50 placeholder:text-gray-50 p-2 z-0`}
          type={passwordVisible ? "text" : "password"}
          name={name}
          id=""
          placeholder="Enter your Password"
          value={value}
          onChange={onChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <button
          type="button"
          onClick={handleClick}
          className="flex z-10 mt-5 ml-[18rem] absolute"
        >
          <img
            src={
              passwordVisible ? "/svg/ojoCerrado.svg" : "/svg/ojoAbierto.svg"
            }
          />
        </button>
      </div>
    </div>
  );
};

const NumberInput = ({
  onChange,
  value,
  name
} : {
  onChange: (e: React.FormEvent) => void;
  value: number
  name: string
}) => { 
  const [isInputSelected, setIsInputSelected] = useState(false);

  const handleInputFocus = () => {
    setIsInputSelected(true);
  }

  const handleInputBlur = () => {
    setIsInputSelected(false);
  }

  return(
    <div className={styles.customNumberInput}>
     <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          min={1}
          max={12}
          className={`${isInputSelected ? "outline-2 outline-primaryv transition-colors duration-200" : "outline-none"} outline-none flex justify-center rounded-md bg-gray-700 p-2 h-9 w-28 placeholder:text-gray-50 text-gray-50`}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
    </div>
)}
  
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    skillIds: [] as number[],
  });

  const [skillData, setSkillData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dbData/skills")
      .then((response) => response.json())
      .then((data) => {
        setSkillData(data);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario enviados:", formData);
    setFormData({
      userName: "",
      email: "",
      password: "",
      skillIds: [],
    });
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "/projects";
      } else {
        alert(data.error);
      }
    } catch (error) {}
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section>
      <form
        className="flex my-2 flex-col justify-center items-center mx-8"
        onSubmit={handleSubmit}
      >
        {/* Componente Input para el username */}
        <Input
          name="userName"
          title="USERNAME"
          placeHolder="Enter your Username"
          value={formData.userName}
          className=""
          titleClassName="text-xs font-semibold tracking-widest font-bebas mb-1"
          onChange={handleInputChange}
        />
        {/* Componente Input para el email */}
        <Input
          name="email"
          title="EMAIL"
          placeHolder="Enter your email"
          value={formData.email}
          className=""
          titleClassName="text-xs font-semibold tracking-widest font-bebas mb-1"
          onChange={handleInputChange}
        />
        {/* Componente PasswordInput */}
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <div>
          <div className="mt-2 mb-1">
            <h6 className="text-xs font-semibold tracking-widest font-bebas">
              SKILLS
            </h6>
          </div>
          <div className="bg-gray-800 rounded-md text-gray-200 text-sm w-80 h-12">
            <MultiSelectInput
              isMulti={true}
              name="skillIds"
              options={skillData.map((skill : any) => ({
                value: skill.id,
                label: skill.name,
              }))}
              skillIds={formData.skillIds}
              onSelectedOptionsChange={(skillIds) =>
                setFormData({ ...formData, skillIds })
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center w-72 mt-4 py-3 bg-primaryv rounded-lg"
        >
          <h4 className="text-xl tracking-wide font-[550]">Sign Up</h4>
        </button>
      </form>
    </section>
  );
};

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    //rememberMe: false,
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario enviados:", formData);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.Success);
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

        document.cookie = `accessToken=${accessToken}; path=/; sameSite=lax`;
        document.cookie = `refreshToken=${refreshToken}; path=/; sameSite=lax`;

        window.location.href = "/projects";
      } else {
        alert(data.error);
      }
    } catch (error) {}
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="flex mt-2 flex-col justify-center align-middle mx-8">
        {/* Componente Input para el nombre de usuario o correo electrónico */}
        <Input
          name="email"
          title="EMAIL"
          placeHolder="Enter your email"
          value={formData.email}
          className=""
          titleClassName="text-xs font-semibold tracking-widest font-bebas mb-1"
          onChange={handleInputChange}
        />
        {/* Componente PasswordInput */}
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
{/*       <div className="flex flex-row justify-between items-center">
        <label className="flex items-center align-middle text-sm text-gray-50 ml-10">
          <input
            type="checkbox"
            name="rememberMe"
            //checked={formData.rememberMe}
            onChange={handleInputChange}
            className="mr-1"
          />
          Remember Me
        </label>
        <h6 className="text-sm text-blue mr-10">
          <Link href="/forgot-password">Forgot Password?</Link>
        </h6>
      </div> */}
      <div className="flex justify-center items-center flex-col">
        <button
          type="submit"
          className="w-72 mt-3 mb-6 py-3 bg-primaryv rounded-lg"
        >
          <h4 className="text-xl tracking-wide font-[550]">Login</h4>
        </button>
      </div>
    </form>
  );
};

const ProjectForm = ({
  handleCreateProject,
}: {
  handleCreateProject: ({ formData } : { formData: Project }) => void;
}) => {
  const options = ["New Project"];
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState<Project>({
    name: "",
    description: "",
    maxMembers: 0,
    statusId: 1
  });

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    setFormData({
      name: formData.name,
      description: formData.description,
      maxMembers: formData.maxMembers,
      statusId: 1
    });

    handleCreateProject({ formData });
    
    console.log(formData)

    fetch("http://localhost:3000/project/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => {

        if (response.status === 401) {
          window.location.href = '/login';
          return Promise.reject('Unauthorized');
        }

        if (!response.ok) {
          return response.json().then((data) => {
            console.log(data);
            throw new Error(`Server error: ${data.message}`);
          });
        }
        return response.json();
      })

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleInputChange = (e: any) => {
    const { name , value } = e.target;
    
      if (name === "maxMembers") {
      const parsedValue = parseInt(value, 10);
      setFormData({ ...formData, [name]: parsedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="divide-y divide-primaryv"
      >
        <section className="grid grid-cols-3 auto-rows-auto divide-x divide-primaryv">
          <div className="col-span-1">
            <OptionsMenu
              options={options}
              onSelectOption={setSelectedTemplate}
              handleOptionClick={handleOptionClick}
              selectedOption={selectedOption}
            />
          </div>
          <div className="p-4 ">
            <div>
              <h1 className="text-2xl">
                {selectedOption !== "" ? `${selectedOption}` : ""}
              </h1>
            </div>
            <div className="my-2">
              <Input
                name="name"
                title="Project Name"
                placeHolder="Enter your Project Name"
                value={formData.name}
                className="h-9 w-128 placeholder:text-gray-50 text-gray-50"
                titleClassName="text-xs font-raleway font-light tracking-wide"
                onChange={handleInputChange}
              />
              <Input
                name="description"
                title="Description"
                placeHolder="Enter a brief description"
                value={formData.description}
                className="h-9 w-128 placeholder:text-gray-50 text-gray-50 z-20"
                titleClassName="text-xs font-raleway font-light tracking-wide"
                onChange={handleInputChange}
              />
              <div className="mb-32">
                <h6 className="text-xs font-raleway font-light tracking-wide">Members</h6>
                <NumberInput
                  name="maxMembers"
                  value={Number (formData.maxMembers)}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </section>
        <div className="w-full flex items-center justify-center ">
          <button
            className="text-white p-2 bg-primaryv w-36 rounded-md mt-9"
            type="submit"
          >
            Create Project
          </button>
        </div>
      </form>
    </section>
  );
};

export { SignUpForm, LoginForm, ProjectForm, Input };
