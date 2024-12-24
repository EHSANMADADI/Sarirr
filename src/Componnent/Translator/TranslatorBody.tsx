import React, { useState } from 'react'
import { useStore } from '../../Store/Store';
import { FaChevronDown } from 'react-icons/fa';
import TextEreaUser from './TextEreaUser';

export default function TranslatorBody() {
    const [selectedModel, setSelectedModel] = useState("aya-23-8b:2");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const {setKeywords}=useStore()
    const handleModelClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleItemClick = (model: string) => {
      setKeywords(model)
      setSelectedModel(model);
      setIsDropdownOpen(false);
    };
  
    return (
      <>
        <div className="flex items-center w-3/4 my-3 mx-auto justify-end relative">
          <span>
            <FaChevronDown onClick={handleModelClick} />
          </span>
          <span onClick={handleModelClick} className="cursor-pointer px-2">
            {selectedModel}
          </span>
  
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 bg-white border rounded shadow-lg z-10">
              <ul>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleItemClick("aya-expanse-32b")}
                >
                  مدل زبانی آیا 32
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleItemClick("aya-23-8b:2")}
                >
                  مدل زبانی آیا 8
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-4/5 mx-auto my-5">
          <TextEreaUser />
        </div>
      </>
    );
}
