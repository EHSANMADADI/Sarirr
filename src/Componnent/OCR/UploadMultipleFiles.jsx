import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiCircleRemove } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import api from "../../Config/api";
import { useStore } from '../../Store/Store';

export default function UploadMultipleFiles({ files, setSaveItems, saveItems, setAllFilesUploaded, allFilesUploaded, setFiles }) {
  const { type } = useStore()
  const [fileStates, setFileStates] = useState(files.map(file => ({
    file,
    responseText: '',
    src: '',
    isSent: false,
    progress: 0,
    url_document: '',
    isPdf: false,
    TotalPagePdf: null
  })));

  const [progressAll, setProgressAll] = useState(0);

  const handleUpload = (fileState, index) => {
    try {
      console.log(fileState);
      const formData = new FormData();
      formData.append('image', fileState.file);
      console.log(formData);
      let imageUrls;
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrls = e.target.result;
      };
      reader.readAsDataURL(fileState.file);
      console.log(type);
      if (type === "Hebrew") {
        axios.post('/process_Hebrew', formData, {
          onUploadProgress: (progressEvent) => {
            const percentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            setFileStates(prevStates => {
              const updatedStates = [...prevStates];
              updatedStates[index].progress = percentage;
              return updatedStates;
            });
          }
        }).then(res => {
          console.log("res form Hebrow=>", res);
          setFileStates(prevStates => {
            const updatedStates = [...prevStates];
            fileState.file.type === "application/pdf" ? updatedStates[index].isPdf = true : updatedStates[index].isPdf = false
            updatedStates[index].isSent = true;
            updatedStates[index].responseText = res.data.Translated_Text;
            updatedStates[index].src = imageUrls;
            updatedStates[index].url_document = res.data.document_url || '';
            return updatedStates;
          });

        }).catch((err) => {
          alert(`فایل ${fileState.file.name} ارسال نشد`);
          console.log(err);
        })
      }
      else {
        api.post(`/process_image?type=${type}`, formData, {
          onUploadProgress: (progressEvent) => {
            const percentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            setFileStates(prevStates => {
              const updatedStates = [...prevStates];
              updatedStates[index].progress = percentage;
              return updatedStates;
            });
          }
        })
          .then(res => {
            console.log("res form eliaaa=>", res);
            setFileStates(prevStates => {
              const updatedStates = [...prevStates];
              const isPdf = fileState.file.type === "application/pdf";

              // ترکیب متن صفحات با شماره صفحه و خط جداکننده
              const combinedText = res.data.pages.map((page, i) => {
                return `${page.text}\n----------------(صفحه شماره  ${i + 1})----------------\n`;
              }).join('\n');

              updatedStates[index] = {
                ...updatedStates[index],
                isPdf,
                isSent: true,
                responseText: combinedText,
                src: imageUrls,
                url_document: res.data.document_url
              };


              return updatedStates;
            });

          })
          .catch(err => {
            alert(`فایل ${fileState.file.name} ارسال نشد`);
            console.log(err);
          });
      }

    } catch (error) {
      console.log(error);
      setFiles(null);
    }


  };

  useEffect(() => {
    fileStates.forEach((fileState, index) => {
      if (!fileState.isSent) {
        handleUpload(fileState, index);
      }
    });
  }, []);

  useEffect(() => {
    const totalFiles = fileStates.length;
    const sentFiles = fileStates.filter(fileState => fileState.isSent).length;
    const newProgressAll = totalFiles === 0 ? 0 : Math.floor((sentFiles / totalFiles) * 100);
    setProgressAll(newProgressAll);

    if (sentFiles === totalFiles && totalFiles > 0) {
      setAllFilesUploaded(true);

      // Manage the localStorage storage
      const storedArray = localStorage.getItem('multiSeavedItems');
      const parsedArray = storedArray ? JSON.parse(storedArray) : [];
      const updatedArray = [fileStates, ...parsedArray];
      localStorage.setItem('multiSeavedItems', JSON.stringify(updatedArray));
      setSaveItems(updatedArray);
    }
  }, [fileStates]);

  return (
    <div>
      {
        saveItems.length === 0 && !files && <div className='flex text-center justify-center text-gray-500 xl:text-2xl text-lg font-bold mt-10'>
          <p className='text-center'>فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
        </div>
      }

      {
        !allFilesUploaded && files && <div className='w-full'>
          <div className='border border-gray-100 shadow-2xl rounded-lg xl:mx-6 mx-1 xl:p-5 py-2 mb-10 bg-white'>
            <div className='flex justify-between items-center md:mx-5 mx-2'>
              <p className='text-lg  font-semibold overflow-clip py-2'>درحال پردازش لطفا صبر کنید</p>
              {
                progressAll === 100 && <div className='text-lg text-green-500'>
                  <FaCheckCircle />
                </div>
              }
            
            </div>

            <div className='mx-6 mt-1'>
              <div className="bg-gray-200 rounded-full h-2 ">
                <div className="bg-blue-700 h-2 rounded-full" style={{ width: `${progressAll}%` }}></div>
              </div>
              <div className="flex justify-end mb-1">
                <span className="text-sm font-medium text-gray-400 ">{progressAll}%</span>
              </div>
         
            </div>
          </div>
        </div>
      }
    </div>
  );
}
