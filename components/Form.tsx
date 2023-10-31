"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import MultiSelectInput from "./MultiSelectInput";
import Icons from "./Icons";

const Input = ({
  title,
  placeHolder,
  name,
  value,
  onChange,
}: {
  title: string;
  placeHolder: string;
  name: string;
  value: string;
  onChange: (e: React.FormEvent) => void;
}) => {
  return (
    <div className="my-2">
      <h6 className="text-xs font-semibold tracking-widest font-bebas mb-1">
        {title}
      </h6>
      <input
        className="flex justify-center w-80 h-12 rounded-md bg-gray-800 text-gray-50 p-2"
        type="text"
        name={name}
        value={value}
        id=""
        placeholder={placeHolder}
        onChange={onChange}
      />
    </div>
  );
};

const PasswordInput = ({
  name,
  value,
  onChange,
}: {
  name: string | undefined;
  value: string;
  onChange: (e: React.FormEvent) => void;
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleClick = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="my-2">
      <h6 className="text-xs font-semibold tracking-widest">PASSWORD</h6>
      <div className="flex flex-row relative justify-between">
        <input
          className="flex justify-center mt-1 w-80 h-12 rounded-md bg-gray-800 text-gray-50 p-2 z-0 "
          type={passwordVisible ? "text" : "password"}
          name={name}
          id=""
          placeholder="Enter your Password"
          value={value}
          onChange={onChange}
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

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    skillIds: [],
  });

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

      if (!response.ok) {
        alert(data.error);
      }
    } catch (error) {}
  };

  const handleInputChange = (e: React.FormEvent) => {
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
          onChange={handleInputChange}
        />
        {/* Componente Input para el email */}
        <Input
          name="email"
          title="EMAIL"
          placeHolder="Enter your email"
          value={formData.email}
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
              name="skillIds"
              options={[
                { value: 1, label: "Back-End dev" },
                { value: 2, label: "Front-End dev" },
                { value: 3, label: "Software dev" },
              ]}
              skillIds={formData.skillIds}
              onSelectedOptionsChange={(skillIds) =>
                setFormData({ ...formData, skillIds })
              }
            />
          </div>
        </div>
        <div className="mb-3 mt-3">
          <Icons />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center w-72 mt-4 py-3 bg-darker-purple rounded-lg"
        >
          <h4 className="text-xl tracking-wide font-[550]">Sign Up</h4>
        </button>
      </form>
    </section>
  );
};

const LoginForm: React.FC = () => {
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
        const accessToken = data.accessToken
        const refreshToken = data.refreshToken 
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
          onChange={handleInputChange}
        />
        {/* Componente PasswordInput */}
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <label className="flex items-center align-middle text-sm text-gray-50 ml-10">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="mr-1"
          />
          Remember Me
        </label>
        {/* Forgot Password */}
        <h6 className="text-sm text-blue mr-10">
          <Link href="/forgot-password">Forgot Password?</Link>
        </h6>
      </div>
      <div className="mb-3 mt-6">
        <Icons />
      </div>
      <div className="flex justify-center items-center flex-col">
        <button
          type="submit"
          className="w-72 mt-3 mb-6 py-3 bg-darker-purple rounded-lg"
        >
          <h4 className="text-xl tracking-wide font-[550]">Login</h4>
        </button>
      </div>
    </form>
  );
};

export { SignUpForm, LoginForm };
