import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useStore } from '../../Store/Store';

import SmalModal from '../Share/SmalModal';

export default function InputMultiple({ files, setFiles, error, setError }) {
    const { setType } = useStore();
    const MAX_FILE_SIZE = 104857600; // 10MB
    const [open, setOpen] = useState(false);
    const [tempFiles, setTempFiles] = useState([]); // Temporary storage for files

    const handleChange = (event) => {
        setType(event.target.value); // مقدار گزینه انتخاب‌شده
        handleModalClose()
    };
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
            setTempFiles(validFiles); // Store files temporarily
            setOpen(true); // Open modal
            setError('');
        } else {
            setFiles([]); // Clear files if there's an error
        }
    };

    const handleButtonClick = () => {
        document.getElementById('dropzone-file').click();
    };

    const handleModalClose = () => {
        setFiles(tempFiles); // Set the files only when modal is closed
        setOpen(false);
    };

    return (
        <>

            <div className="lg:w-1/2 w-full mx-auto  max-h-full  lg:flex flex-col justify-center">
                <div className="flex items-center w-full flex-col justify-center">
                    <div className='w-full flex flex-col border-2 border-gray-300 border-dashed h-[32rem] my-20 justify-center rounded-lg'>
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 mt-5">
                                <span className='text-8xl mb-4 text-blue-400'><FaCloudUploadAlt /></span>
                                <p className='xl:text-2xl text-base font-bold'>فایل های خود را انتخاب کنید</p>
                            </div>
                            <button type="button" onClick={handleButtonClick} className='px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-xl font-black text-xl shadow-2xl hover:opacity-100 border-[3px] border-blue-200 text-white'>انتخاب فایل</button>
                            <input multiple id="dropzone-file" type="file" accept='.jpg,.jpeg,.png' className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                </div>
                <div className='flex lg:w-1/4 mx-auto justify-center items-center'>
                    <SmalModal
                        Open={open}
                        onClose={handleModalClose} // Use the updated modal close handler
                    >
                        <div dir='rtl' className='flex-col items-center justify-around  max-h-[66vh]  p-3'>
                            <div>
                                <input
                                    id="Hebrew"
                                    type="radio"
                                    value="Hebrew"
                                    name="type"
                                    className="sm:w-6 sm:h-6 w-4 h-4 mx-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    onChange={handleChange}
                                />
                                <label htmlFor="Hebrew" className="text-base font-bold text-gray-900">
                                    متن درای زبان عبری
                                </label>
                            </div>

                            <div className='my-5'>

                                <input
                                    id="general"
                                    type="radio"
                                    value="general"
                                    name="type"
                                    className="sm:w-6 sm:h-6 w-4 h-4 mx-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    onChange={handleChange}
                                />
                                <label htmlFor="general" className="text-base font-bold text-gray-900">
                                    سند عمومی
                                </label>

                            </div>

                            <div>
                                <input
                                    id="ID-card"
                                    type="radio"
                                    value="ID-card"
                                    name="type"
                                    className="sm:w-6 sm:h-6 w-4 h-4 mx-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    onChange={handleChange}
                                />
                                <label htmlFor="ID-card" className="text-base font-bold text-gray-900">
                                    کارت های شناسایی
                                </label>
                            </div>
                        </div>

                    </SmalModal>
                </div>

            </div>

        </>

    );
}
