import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import SelectRole from "./SelectRole";
import axios from "axios";

export default function InputFile({ setFiles, setError }) {
  const MAX_FILE_SIZE = 104857600; // 10MB
  const [token, settoken] = useState('')
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = [];
    let hasError = false;

    selectedFiles.forEach((file) => {
      if (file.size <= MAX_FILE_SIZE) {
        validFiles.push(file);
      } else {
        setError('File size must be less than 10MB');
        alert('File size must be less than 10MB');
        hasError = true;
      }
    });

    if (!hasError) {
      setFiles(validFiles);
      setError('');
    } else {
      setFiles([]);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('dropzone-file').click();
  };


  // useEffect(() => {
  //   axios.post('https://192.168.4.161:8081/api/auth/signin', {
  //     login: "ehsan",
  //     password: "123456"
  //   }).then((res)=>{
  //     console.log(res);
  //     settoken(res.data.accessToken)
  //   })
  // }, [])


  return (
    <div className="md:w-1/2 w-full mx-auto max-h-full  flex justify-center">
      <div className="flex items-center w-full flex-col justify-center">
        <div className="w-full flex flex-col border-2 border-gray-300 border-dashed h-[32rem] my-20 justify-center rounded-lg">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 mt-5">
              <span className="text-8xl mb-4 text-blue-400">
                <FaCloudUploadAlt />
              </span>
              <p className="md:text-2xl text-base font-bold">
                فایل های خود را انتخاب کنید
              </p>
            </div>
            <button
              type="button"
              onClick={handleButtonClick}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-xl font-black text-xl shadow-2xl hover:opacity-100 border-[3px] border-blue-200 text-white"
            >
              انتخاب فایل
            </button>

            <input
              multiple
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
