/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Share/Modal';
import InputMultiple from './InputMultiple';
import Swal from 'sweetalert2';
import { IoMdEye } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useStore } from '../../Store/Store';
import { FaCheckCircle } from 'react-icons/fa';
import UploadMultipleFiles from './UploadMultipleFiles.jsx';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import axios from 'axios';
import { FaRegFilePdf } from "react-icons/fa";
// import api from '../../Config/api';
import { FaAngleDown } from "react-icons/fa6";
import { Dropdown, DropdownItem } from "flowbite-react";
import { RiFileExcel2Line } from "react-icons/ri";
import { AiFillFileWord } from "react-icons/ai";
// // import { useStore } from '../../Store/Store';
// import { Worker } from '@react-pdf-viewer/core';
// // Import the main Viewer component
// import { Viewer } from '@react-pdf-viewer/core';
// // Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// // default layout plugin
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// // Import styles of default layout plugin
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';

// // استفاده از worker به صورت ماژول محلی
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
export default function Multipel() {
    const [files, setFiles] = useState(null);
    const [error, setError] = useState('');
    const [openModals, setOpenModals] = useState([]);
    const [saveItems, setSaveItems] = useState([]);
    const [allFilesUploaded, setAllFilesUploaded] = useState(false);
    const [isDownloadExcell, setIsDownloadExcell] = useState([]);
    const [isDownloadPdf, setIsDownloadPdf] = useState([]);
    const [isDownloadWord, setIsDownloadWord] = useState([]);
    const [disabled, setDisabled] = useState(false)
    console.log("multiple files", files);
    const hasSaved = useRef(false);
    // const defaultLayoutPluginInstance = defaultLayoutPlugin();


    useEffect(() => {
        if (allFilesUploaded && !hasSaved.current) {
            try {
                localStorage.setItem('multiSeavedItems', JSON.stringify(saveItems));
                console.log('Items saved successfully');
                hasSaved.current = true;
                window.location.reload();
            } catch (err) {
                console.error('Error saving items:', err);
            }
        }
    }, [allFilesUploaded, saveItems]);

    useEffect(() => {
        function getSavedItems() {
            try {
                const storedItems = JSON.parse(localStorage.getItem('multiSeavedItems'));
                setSaveItems(storedItems || []);
            } catch (err) {
                console.error('Error retrieving items:', err);
            }
        }
        getSavedItems();

    }, []);



    const { setShowBTN, ChangeIndexMultiple } = useStore();
    // const pdfFileUrl = localStorage.getItem('pdfFileUrl')




    const handelremove = (id) => {
        const updatedItems = saveItems.filter((_, i) => i !== id);
        setSaveItems(updatedItems);

        try {
            localStorage.setItem('multiSeavedItems', JSON.stringify(updatedItems));
            Swal.fire({
                title: "فایل با موفقیت حذف شد",
                icon: "success",
            });
        } catch (error) {
            console.error("Error updating localStorage: ", error);
        }
    };

    const handleModalOpen = (index, txt) => {
        localStorage.setItem('txt', txt);
        const updatedOpenModals = [...openModals];
        updatedOpenModals[index] = true;
        setOpenModals(updatedOpenModals);
    };

    const handleModalClose = (index) => {
        const updatedOpenModals = [...openModals];
        updatedOpenModals[index] = false;
        setOpenModals(updatedOpenModals);
    };

    const handelDownloadExcellDB = async (index) => {
        try {
            setDisabled(true)
            const zip = new JSZip(); // ایجاد یک فایل ZIP
            const updatedIsDownloadExcell = [...isDownloadExcell];
            updatedIsDownloadExcell[index] = true; // وضعیت دانلود فعال می‌شود
            setIsDownloadExcell(updatedIsDownloadExcell);

            for (let itemIndex = 0; itemIndex < saveItems[index].length; itemIndex++) {
                const item = saveItems[index][itemIndex];
                const url_document = item.url_document;

                let isProcessing = true;
                let excelBlob = null;

                // دریافت فایل اکسل تا زمانی که پردازش تمام شود
                // while (isProcessing) {
                //     const response = await api.post(
                //         '/download_excel',
                //         { document_url: url_document }
                //     );

                //     if (response.data.state === "processing") {
                //         console.log(response.data.state);
                //         await new Promise((resolve) => setTimeout(resolve, 3000));
                //     } else {
                //         const res = await api.post(
                //             '/download_excel',
                //             { document_url: url_document },
                //             { responseType: 'blob' }
                //         );
                //         console.log('excel file received');
                //         excelBlob = res.data;
                //         isProcessing = false;
                //     }
                // }
                while (isProcessing) {
                    const response = await axios.post(
                        '/download_excel',
                        { document_url: url_document }
                    );

                    if (response.data.state === "processing") {
                        console.log(response.data.state);
                        await new Promise((resolve) => setTimeout(resolve, 3000));
                    } else {
                        const res = await axios.post(
                            '/download_excel',
                            { document_url: url_document },
                            { responseType: 'blob' }
                        );
                        console.log('excel file received');
                        excelBlob = res.data;
                        isProcessing = false;
                    }
                }

                //     if (excelBlob) {
                //         const formData = new FormData();
                //         formData.append('file', excelBlob, 'uploaded_file.xlsx');

                //         // بارگذاری فایل اکسل به سرور
                //         const responseUpload = await api.post(
                //             '/api/upload',
                //             formData,
                //             { headers: { 'Content-Type': 'multipart/form-data' } }
                //         );

                //         if (responseUpload.status === 200) {
                //             const res = await api.post(
                //                 '/api/extract',
                //                 { file_path: responseUpload.data.file_path },
                //                 { headers: { 'Content-Type': 'application/json' } }
                //             );

                //             if (res.status === 200) {
                //                 const fileUrl = `http://109.230.90.198:17017//api/download/${res.data.output_file}`;
                //                 const fileResponse = await api.get(`/api/download/${res.data.output_file}`, { responseType: 'blob' });

                //                 // اضافه کردن فایل اکسل به زیپ
                //                 const fileName = res.data.output_file; // نام پیش‌فرض فایل دانلودی
                //                 zip.file(fileName, fileResponse.data);
                //             }
                //         }
                //     }
                // }
                if (excelBlob) {
                    const formData = new FormData();
                    formData.append('file', excelBlob, 'uploaded_file.xlsx');

                    // بارگذاری فایل اکسل به سرور
                    const responseUpload = await axios.post(
                        'http://109.230.90.198:17017/api/upload',
                        formData,
                        { headers: { 'Content-Type': 'multipart/form-data' } }
                    );

                    if (responseUpload.status === 200) {
                        const res = await axios.post(
                            'http://109.230.90.198:17017/api/extract',
                            { file_path: responseUpload.data.file_path },
                            { headers: { 'Content-Type': 'application/json' } }
                        );

                        if (res.status === 200) {
                            const fileUrl = `http://109.230.90.198:17017/api/download/${res.data.output_file}`;
                            const fileResponse = await axios.get(`http://109.230.90.198:17017/api/download/${res.data.output_file}`, { responseType: 'blob' });

                            // اضافه کردن فایل اکسل به زیپ
                            const fileName = res.data.output_file; // نام پیش‌فرض فایل دانلودی
                            zip.file(fileName, fileResponse.data);
                        }
                    }
                }
            }

            // ایجاد فایل زیپ و دانلود آن
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'excel_files.zip'); // فایل زیپ دانلود می‌شود

        }
        catch (error) {
            console.error('Error downloading Excel files:', error);
            Swal.fire({
                title: 'خطا در دانلود فایل اکسل',
                icon: 'error',
                text: 'لطفاً دوباره تلاش کنید.',
            });
        } finally {
            const updatedIsDownloadExcell = [...isDownloadExcell];
            updatedIsDownloadExcell[index] = false; // وضعیت دکمه را ریست می‌کنیم
            setIsDownloadExcell(updatedIsDownloadExcell);
            setDisabled(false)
        }
    };
    const handelDownloadExcell = async (index) => {
        try {
            setDisabled(true)
            const zip = new JSZip(); // ایجاد یک فایل ZIP
            const updatedIsDownloadExcell = [...isDownloadExcell];
            updatedIsDownloadExcell[index] = true; // وضعیت دانلود فعال می‌شود
            setIsDownloadExcell(updatedIsDownloadExcell);

            for (let itemIndex = 0; itemIndex < saveItems[index].length; itemIndex++) {
                const item = saveItems[index][itemIndex];
                const url_document = item.url_document;

                let isProcessing = true;
                let excelBlob = null;

                // دریافت فایل اکسل تا زمانی که پردازش تمام شود
                // while (isProcessing) {
                //     const response = await api.post(
                //         '/download_excel',
                //         { document_url: url_document }
                //     );

                //     if (response.data.state === "processing") {
                //         console.log(response.data.state);
                //         await new Promise((resolve) => setTimeout(resolve, 3000));
                //     } else {
                //         const res = await api.post(
                //             '/download_excel',
                //             { document_url: url_document },
                //             { responseType: 'blob' }
                //         );
                //         console.log('excel file received');
                //         excelBlob = res.data;
                //         isProcessing = false;
                //     }
                // }
                while (isProcessing) {
                    const response = await axios.post(
                        'http://109.230.90.198:17017/download_excel',
                        { document_url: url_document }
                    );

                    if (response.data.state === "processing") {
                        console.log(response.data.state);
                        await new Promise((resolve) => setTimeout(resolve, 3000));
                    } else {
                        const res = await axios.post(
                            'http://109.230.90.198:17017/download_excel',
                            { document_url: url_document },
                            { responseType: 'blob' }
                        );
                        console.log('excel file received');
                        excelBlob = res.data;
                        isProcessing = false;
                    }
                }

                // افزودن فایل اکسل به فایل ZIP
                if (excelBlob) {
                    const fileName = `file_${itemIndex + 1}.xlsx`; // نام فایل
                    zip.file(fileName, excelBlob); // اضافه کردن فایل به ZIP
                }
            }

            // ایجاد فایل زیپ و دانلود آن
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'excel_files.zip'); // فایل زیپ دانلود می‌شود

        } catch (error) {
            console.error('Error downloading Excel files:', error);
            Swal.fire({
                title: 'خطا در دانلود فایل اکسل',
                icon: 'error',
                text: 'لطفاً دوباره تلاش کنید.',
            });
        } finally {
            const updatedIsDownloadExcell = [...isDownloadExcell];
            updatedIsDownloadExcell[index] = false; // وضعیت دکمه را ریست می‌کنیم
            setIsDownloadExcell(updatedIsDownloadExcell);
            setDisabled(false)

        }
    };


    const handelDownloadPdf = async (index) => {
        try {
            setDisabled(true)
            const zip = new JSZip(); // ایجاد یک فایل ZIP
            const updatedIsDownloadPdf = [...isDownloadPdf];
            updatedIsDownloadPdf[index] = true; // وضعیت دانلود فعال می‌شود
            setIsDownloadPdf(updatedIsDownloadPdf);

            for (let itemIndex = 0; itemIndex < saveItems[index].length; itemIndex++) {
                const item = saveItems[index][itemIndex];
                const url_document = item.url_document;

                let isProcessing = true;
                let pdfBlob = null;

                // دریافت فایل PDF تا زمانی که پردازش تمام شود
                // while (isProcessing) {
                //     const response = await api.post(
                //         '/download_pdf',
                //         { document_url: url_document }
                //     );

                //     if (response.data.state === "processing") {
                //         console.log(response.data.state);
                //         await new Promise((resolve) => setTimeout(resolve, 3000));
                //     } else {
                //         const res = await api.post(
                //             '/download_pdf',
                //             { document_url: url_document },
                //             { responseType: 'blob' }
                //         );
                //         console.log('PDF file received');
                //         pdfBlob = res.data;
                //         isProcessing = false;

                //         // اضافه کردن فایل به ZIP
                //         const fileName = `file_${itemIndex + 1}.pdf`; // نام فایل
                //         zip.file(fileName, pdfBlob); // اضافه کردن فایل به ZIP
                //     }
                // }
                while (isProcessing) {
                    const response = await axios.post(
                        'http://109.230.90.198:17017/download_pdf',
                        { document_url: url_document }
                    );

                    if (response.data.state === "processing") {
                        console.log(response.data.state);
                        await new Promise((resolve) => setTimeout(resolve, 3000));
                    } else {
                        const res = await axios.post(
                            'http://109.230.90.198:17017/download_pdf',
                            { document_url: url_document },
                            { responseType: 'blob' }
                        );
                        console.log('PDF file received');
                        pdfBlob = res.data;
                        isProcessing = false;

                        // اضافه کردن فایل به ZIP
                        const fileName = `file_${itemIndex + 1}.pdf`; // نام فایل
                        zip.file(fileName, pdfBlob); // اضافه کردن فایل به ZIP
                    }
                }
            }

            // ایجاد فایل زیپ و دانلود آن
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'PDF_files.zip'); // فایل زیپ دانلود می‌شود
        } catch (error) {
            console.error('Error downloading PDF files:', error);
            Swal.fire({
                title: 'خطا در دانلود فایل PDF',
                icon: 'error',
                text: 'لطفاً دوباره تلاش کنید.',
            });
        } finally {
            const updatedIsDownloadPdf = [...isDownloadPdf];
            updatedIsDownloadPdf[index] = false; // وضعیت دکمه را ریست می‌کنیم
            setIsDownloadPdf(updatedIsDownloadPdf);
            setDisabled(false)

        }
    };


    const handelDownloadWord = async (index) => {
        try {
            setDisabled(true)

            const zip = new JSZip(); // ایجاد یک فایل ZIP
            const updatedIsDownloadWord = [...isDownloadWord];
            updatedIsDownloadWord[index] = true; // وضعیت دانلود فعال می‌شود
            setIsDownloadWord(updatedIsDownloadWord);

            for (let itemIndex = 0; itemIndex < saveItems[index].length; itemIndex++) {
                const item = saveItems[index][itemIndex];
                const url_document = item.url_document;

                let isProcessing = true;
                let wordBlob = null;

                // دریافت فایل PDF تا زمانی که پردازش تمام شود
                // while (isProcessing) {
                //     const response = await api.post(
                //         '/download_word',
                //         { document_url: url_document }
                //     );

                //     if (response.data.state === "processing") {
                //         console.log(response.data.state);
                //         await new Promise((resolve) => setTimeout(resolve, 3000));
                //     } else {
                //         const res = await api.post(
                //             '/download_word',
                //             { document_url: url_document },
                //             { responseType: 'blob' }
                //         );
                //         console.log('word file received');
                //         wordBlob = res.data;
                //         isProcessing = false;

                //         // اضافه کردن فایل به ZIP
                //         const fileName = `file_${itemIndex + 1}.doc`; // نام فایل
                //         zip.file(fileName, wordBlob); // اضافه کردن فایل به ZIP
                //     }
                // }
                while (isProcessing) {
                    const response = await axios.post(
                        'http://109.230.90.198:17017/download_word',
                        { document_url: url_document }
                    );

                    if (response.data.state === "processing") {
                        console.log(response.data.state);
                        await new Promise((resolve) => setTimeout(resolve, 3000));
                    } else {
                        const res = await axios.post(
                            'http://109.230.90.198:17017/download_word',
                            { document_url: url_document },
                            { responseType: 'blob' }
                        );
                        console.log('word file received');
                        wordBlob = res.data;
                        isProcessing = false;

                        // اضافه کردن فایل به ZIP
                        const fileName = `file_${itemIndex + 1}.doc`; // نام فایل
                        zip.file(fileName, wordBlob); // اضافه کردن فایل به ZIP
                    }
                }
            }

            // ایجاد فایل زیپ و دانلود آن
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'WORD_files.zip'); // فایل زیپ دانلود می‌شود
        } catch (error) {
            console.error('Error downloading word files:', error);
            Swal.fire({
                title: 'خطا در دانلود فایل word',
                icon: 'error',
                text: 'لطفاً دوباره تلاش کنید.',
            });
        } finally {
            const updatedIsDownloadWord = [...isDownloadPdf];
            updatedIsDownloadWord[index] = false; // وضعیت دکمه را ریست می‌کنیم
            setIsDownloadWord(updatedIsDownloadWord);
            setDisabled(false)

        }
    };

    return (
        <>

            <div className='flex lg:overflow-hidden bg-blue-50 lg:flex-nowrap flex-wrap'>

                <div className='w-2/3  mx-auto'>
                    <InputMultiple files={files} setFiles={setFiles} error={error} setError={setError} />
                </div>
                <div className='lg:w-1/2 w-full mx-auto sm:mr-20 flex items-start'>
                    <div className='w-full max-h-[35rem] lg:mt-20  h-full overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-yellow-600 scrollbar-track-gray-50 '>
                        {!files && saveItems.length === 0 && (
                            <div className='flex justify-center items-center text-gray-500 sm:text-2xl text-base font-bold mt-10 text-center'>
                                <p>فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
                            </div>
                        )}
                        {files && (
                            <UploadMultipleFiles
                                allFilesUploaded={allFilesUploaded}
                                setAllFilesUploaded={setAllFilesUploaded}
                                keys={files.length}
                                files={files}

                                setFiles={setFiles}
                                setSaveItems={setSaveItems}
                                saveItems={saveItems}
                            />
                        )}
                        {saveItems.length > 0 &&
                            saveItems.map((itemArray, index) => (
                                <div key={index} className='box-Item seavItem border bg-white border-gray-100 shadow-lg rounded-lg xl:mx-2 mx-1 xl:p-5 py-2 mb-10'>
                                    <div className='flex justify-between items-center md:mx-5 mx-2'>
                                        <p className='sm:text-xl text-base font-semibold'>پردازش تکمیل شد</p>
                                        <div className='text-lg text-green-500'>
                                            <FaCheckCircle />
                                        </div>
                                    </div>
                                    <div className='sm:mx-6 mx-0 mt-1'>
                                        <div className='bg-gray-200 rounded-full h-2 '>
                                            <div className='bg-blue-600 h-2 rounded-full' style={{ width: '100%' }}></div>
                                        </div>
                                        <div className='flex justify-end mb-1'>
                                            <span className='text-sm font-medium text-gray-400 '>100%</span>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex justify-between w-full'>
                                                <button
                                                    className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                    onClick={() => handelremove(index)}
                                                >
                                                    <span className='text-center  mr-2 text-2xl text-red-600 '>
                                                        <RiDeleteBin6Line />
                                                    </span>
                                                    حذف
                                                </button>
                                                <button
                                                    className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                    onClick={() => { setShowBTN(true); handleModalOpen(index, itemArray.responseText); ChangeIndexMultiple(index) }}
                                                >
                                                    <span className='text-center mr-2 text-2xl text-blue-600'>
                                                        <IoMdEye />
                                                    </span>
                                                    مشاهده
                                                </button>

                                                <Dropdown
                                                    className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                    label=""
                                                    inline
                                                    disabled={disabled}
                                                    renderTrigger={() => (
                                                        <button
                                                            className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                        >
                                                            <span className='text-center mr-2 text-xl text-yellow-600'>
                                                                <FaAngleDown />
                                                            </span>
                                                            {isDownloadExcell[index] || isDownloadPdf[index] || isDownloadWord[index] ? (<span className='text-sm'>صبر کنید</span>) : (<span>Download</span>)}

                                                        </button>
                                                    )}
                                                >
                                                    <DropdownItem onClick={() => (index)}>
                                                        <button
                                                            className='border-none rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                            onClick={() => handelDownloadExcellDB(index)}
                                                            disabled={isDownloadExcell[index]}
                                                        >
                                                            <span className='text-center mr-2 text-xl text-green-700'>
                                                                < RiFileExcel2Line />
                                                            </span>
                                                            {isDownloadExcell[index] ? (<span className='text-sm'>صبر کنید</span>) : (<span>DB excell</span>)}

                                                        </button>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <button
                                                            className='border-none rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                            onClick={() => handelDownloadExcell(index)}
                                                            disabled={isDownloadPdf[index]}
                                                        >
                                                            <span className='text-center mr-2 text-xl text-green-700'>
                                                                < RiFileExcel2Line />
                                                            </span>
                                                            {isDownloadExcell[index] ? (<span className='text-sm'>صبر کنید</span>) : (<span>Alefba excell</span>)}

                                                        </button>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <button
                                                            className='border-none rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                            onClick={() => handelDownloadPdf(index)}
                                                            disabled={isDownloadPdf[index]}
                                                        >
                                                            <span className='text-center mr-2 text-xl text-red-700'>
                                                                <FaRegFilePdf />
                                                            </span>
                                                            {isDownloadPdf[index] ? (<span className='text-sm'>صبر کنید</span>) : (<span>PDF</span>)}

                                                        </button>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <button
                                                            className='border-none rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                            onClick={() => handelDownloadWord(index)}
                                                        >
                                                            <span className='text-center mr-2 text-xl text-blue-600'>
                                                                <AiFillFileWord />
                                                            </span>
                                                            {isDownloadWord[index] ? (<span className='text-sm'>صبر کنید</span>) : (<span>WORD</span>)}

                                                        </button>
                                                    </DropdownItem>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        itemArray.map((file, i) => (
                                            <Modal
                                                key={i}
                                                Open={openModals[index]}
                                                onClose={() => handleModalClose(index)}
                                            >
                                                <div key={i} className="flex md:flex-row flex-col h-full">
                                                    {


                                                        (file.isPdf) ? (
                                                            <div className='pdf md:w-1/2 w-full overflow-x-auto max-h-[80vh] '>
                                                                <iframe
                                                                    src={file.src}
                                                                    title="PDF Preview"
                                                                    width="100%"
                                                                    height="100%"
                                                                    className="border rounded"
                                                                ></iframe>
                                                              
                                                            </div>
                                                        ) : (
                                                            <div dir='rtl' className="md:w-1/2 w-full overflow-x-auto max-h-[80vh] p-2">
                                                                <div className={`grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-${Math.ceil(itemArray.length - 1 / 2)}`}>
                                                                    {itemArray.map((detail, index) => (
                                                                        <div key={index} className="relative w-full">
                                                                            <img
                                                                                className="w-full h-auto  object-cover rounded-lg"
                                                                                src={detail.src}
                                                                                alt={`detail-${index}`}
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )
                                                    }


                                                    <div dir="rtl" className="md:w-1/2 w-full md:p-4 p-2 bg-gray-50 overflow-auto max-h-[80vh]">
                                                        <p className="text-2xl font-black leading-8">
                                                            {itemArray.map((detail, index) => (
                                                                <div key={index} className="border-b-[3px] border-dashed pb-2">
                                                                    <span className='md:text-base text-xs'>{detail.responseText.split('\u200B').join(' ')}</span>
                                                                    <div className="text-left text-sm text-gray-600 mt-1">
                                                                        {`شماره: ${index + 1}`}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Modal>
                                        ))
                                    }


                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>

    );
}
