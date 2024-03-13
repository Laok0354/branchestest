"use client"

import React, { useState } from 'react';

interface OptionsMenuProps {
    options: string[]; 
    onSelectOption: (selectedOption: string) => void; 
    handleOptionClick: Function;
    selectedOption: string;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
    options,
    onSelectOption,
    handleOptionClick,
    selectedOption,
  }: OptionsMenuProps) => {
    return (
      <div className="p-4 rounded">
        <ul className='mb-44'>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                handleOptionClick(option);
                onSelectOption(option);
              }}
              className={`relative cursor-pointer p-2 flex flex-row`}
            >
              {selectedOption === option && (
                <div className="bg-primaryv w-1 rounded-lg mr-2"></div>
              )}
              <li
                className={`w-full p-1 ${
                  selectedOption === option ? 'bg-[#54545f] text-white rounded' : ''
                }`}
              >
                {option}
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  };
  

export default OptionsMenu
