import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiCircleRemove } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function UploadFile({ files, setSaveItems, saveItems, setAllFilesUploaded, allFilesUploaded }) {
    const [fileStates, setFileStates] = useState([]);
    const [progressAll, setProgressAll] = useState(0);
    const [isCancelled, setIsCancelled] = useState(false);

    useEffect(() => {
        // تنظیم وضعیت فایل‌ها در شروع
        if (files && files.length > 0) {
            setFileStates(
                files.map((file) => ({
                    file,
                    responsePin: "",
                    src: "",
                    isSent: false,
                    progress: 0,
                    url_document: "",
                }))
            );
        }
    }, [files]);

    const handleUpload = (fileState, index) => {
        if (isCancelled) return;

        const formData = new FormData();
        formData.append("files", fileState.file);

        const source = axios.CancelToken.source();

        axios
            .post("https://192.168.4.161:8081/api/files/upload?attackType=0", formData, {
                cancelToken: source.token,
                onUploadProgress: (progressEvent) => {
                    const percentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    setFileStates((prevStates) => {
                        const updatedStates = [...prevStates];
                        updatedStates[index].progress = percentage;
                        return updatedStates;
                    });
                },
            })
            .then((res) => {
                setFileStates((prevStates) => {
                    const updatedStates = [...prevStates];
                    updatedStates[index].isSent = true;
                    updatedStates[index].url_document = res.data.document_url;
                    return updatedStates;
                });
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    alert(`فایل ${fileState.file.name} ارسال نشد`);
                }
            });
    };

    useEffect(() => {
        fileStates.forEach((fileState, index) => {
            if (!fileState.isSent && fileState.progress === 0) {
                handleUpload(fileState, index);
            }
        });
    }, [fileStates]);

    useEffect(() => {
        const totalFiles = fileStates.length;
        const sentFiles = fileStates.filter((fileState) => fileState.isSent).length;
        const newProgressAll = totalFiles === 0 ? 0 : Math.floor((sentFiles / totalFiles) * 100);
        setProgressAll(newProgressAll);

        if (sentFiles === totalFiles && totalFiles > 0) {
            setAllFilesUploaded(true);
            setSaveItems(fileStates.map((state) => state.url_document));
        }
    }, [fileStates]);

    const handleCancelUpload = () => {
        setIsCancelled(true);
        setFileStates((prevStates) => prevStates.map((state) => ({ ...state, progress: 0 })));
    };

    const handleDeleteFile = (index) => {
        setFileStates((prevStates) => prevStates.filter((_, i) => i !== index));
        setIsCancelled(false); // امکان بارگذاری فایل‌های جدید
    };

    return (
        <div>
            {fileStates.length === 0 && (
                <div className="flex text-center justify-center text-gray-500 text-2xl font-bold mt-10">
                    <p>فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
                </div>
            )}

            {fileStates.map((fileState, index) => (
                <div className='border border-gray-100 shadow-2xl rounded-lg xl:mx-6 mx-1 xl:p-5 py-2 mb-10 bg-white'>
                    <div className='flex justify-between items-center md:mx-5 mx-2'>
                        {/* <p className="text-sm">{fileState.file.name}</p>
                        <div className="flex-1 mx-2">
                            <div className="bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-700 h-2 rounded-full"
                                    style={{ width: `${fileState.progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <button onClick={() => handleDeleteFile(index)}>
                            <RiDeleteBin6Line className="text-red-600 text-xl" />
                        </button> */}

                        <p className='text-xl font-semibold overflow-clip'>درحال پردازش لطفا صبر کنید</p>
                        {
                            progressAll === 100 && <div className='text-lg text-green-500'>
                                <FaCheckCircle />
                            </div>
                        }
                        {
                            progressAll !== 100 && <div className='text-3xl text-red-500 font-bold cursor-pointer hover:scale-110 duration-200' onClick={() => handleDeleteFile(index)}>
                                <CiCircleRemove />
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
                        <div className='flex'>
                            <div className='flex justify-between w-full items-center'>
                                <button onClick={() => handleDeleteFile(index)  
                                    
                                } className='border-dotted border-black rounded-md border-2 sm:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold flex items-center text-center hover:scale-105 duration-200'>
                                    <span className='text-center mr-2 text-2xl text-red-600'><RiDeleteBin6Line /></span>حذف
                                </button>
                               
                            </div>
                        </div>
                    </div>
                </div>


            ))
            }

            {
                progressAll > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-gray-600">{progressAll}% کامل شده</p>
                        {progressAll === 100 ? (
                            <FaCheckCircle className="text-green-500 text-2xl" />
                        ) : (
                            <button onClick={handleCancelUpload}>
                                <CiCircleRemove className="text-red-500 text-2xl" />
                            </button>
                        )}
                    </div>
                )
            }
        </div >
    );
}
