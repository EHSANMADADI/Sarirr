import { ChangeEvent, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface ImageFile {
  file: File;
  preview: string;
  isProcessComplete: boolean;
}

interface ResponseObject {
  First_Name: string;
  Last_Name: string;
  Father_Name: string;
  National_ID: string;
  Personal_ID: string;
  Birth_Date: string;
  Home_Address: string;
  Job: string;
  Postal_Code: string;
  Education: string;
  Maritalstatus: string;
  Place_of_issuance_of_birth_certificate: string;
  Field_of_study: string;
  Number_Of_Child: string;
  imageIndex?: number; // 🔹 برای مشخص کردن تعلق ردیف به عکس خاص
}

export default function InputFile() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [startProcess, setStartProcess] = useState(false);
  const [rowTable, setRowTable] = useState<ResponseObject[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null); // 🔸 عکس انتخاب‌شده

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray: ImageFile[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isProcessComplete: false,
    }));

    setImages(fileArray);
    setRowTable([]);
    setStartProcess(true);

    fileArray.forEach((img, index) => {
      handleSendSingleImage(img, index);
    });
  };

  const handleSendSingleImage = async (image: ImageFile, index: number) => {
    const formData = new FormData();
    formData.append("image", image.file);

    try {
      const res = await axios.post(
        "http://192.168.4.177:17017/api/image_to_structured_json_batch",
        formData
      );

      const results = res.data;
      console.log(res.data);

      const newData: ResponseObject[] = results.map((item: any) => ({
        First_Name: item.First_Name,
        Last_Name: item.Last_Name,
        Father_Name: item.Father_Name,
        National_ID: item.National_ID,
        Personal_ID: item.Personal_ID,
        Birth_Date: item.Birth_Date,
        Home_Address: item.Home_Address,
        Job: item.Job,
        Postal_Code: item.Postal_Code,
        Education: item.Education,
        Maritalstatus: item.Marital_status,
        Place_of_issuance_of_birth_certificate:
          item.Place_of_issuance_of_birth_certificate,
        Field_of_study: item.Field_of_study,
        Number_Of_Child: item.Number_of_Children,
        imageIndex: index,
      }));

      setRowTable((prev) => [...prev, ...newData]);

      setImages((prevImages) =>
        prevImages.map((img, idx) =>
          idx === index ? { ...img, isProcessComplete: true } : img
        )
      );
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.fire({
        icon: "error",
        title: `خطا در ارسال تصویر ${index + 1}`,
        text: "لطفاً دوباره تلاش کنید.",
      });

      setImages((prevImages) =>
        prevImages.map((img, idx) =>
          idx === index ? { ...img, isProcessComplete: true } : img
        )
      );
    }
  };

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index); // 🔸 روی این عکس کلیک شده
  };

  return (
    <div dir="rtl" className="p-5 font-Sahel">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        لطفا عکس‌های خود را بارگذاری کنید
      </h2>

      <div className="w-full max-w-md mx-auto border-2 border-dashed border-blue-400 p-6 rounded-lg bg-blue-50 shadow-md text-center">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
        />
      </div>

      {startProcess && (
        <div className="flex flex-col md:flex-row gap-6 mt-10">
          <div className="md:w-1/4 w-full grid grid-cols-2 gap-3">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)} // 🔸 کلیک روی عکس
                className={`relative border p-1 rounded-lg shadow cursor-pointer transition ${
                  activeImageIndex === index
                    ? "border-blue-600 ring-2 ring-blue-400"
                    : "bg-white"
                }`}
              >
                <img
                  src={img.preview}
                  alt={`preview-${index}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
                {!img.isProcessComplete && (
                  <div className="absolute top-0 left-0 w-full h-full bg-white/70 flex items-center justify-center rounded-lg">
                    <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="relative w-full overflow-x-auto">
            <table className="hidden sm:table w-full text-sm text-center border text-gray-600 shadow rounded">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-2 py-3">نام</th>
                  <th className="px-2 py-3">نام خانوادگی</th>
                  <th className="px-2 py-3">نام پدر</th>
                  <th className="px-2 py-3">کد ملی</th>
                  <th className="px-2 py-3">شماره شناسنامه</th>
                  <th className="px-2 py-3">تاریخ تولد</th>
                  <th className="px-2 py-3">آدرس</th>
                  <th className="px-2 py-3">شغل</th>
                  <th className="px-2 py-3">کد پستی</th>
                  <th className="px-2 py-3">محل تولد</th>
                  <th className="px-2 py-3">تاهل</th>
                  <th className="px-2 py-3">تحصیلات</th>
                  <th className="px-2 py-3">گرایش</th>
                  <th className="px-2 py-3">تعداد فرزند</th>
                </tr>
              </thead>
              <tbody>
                {rowTable.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="py-4 text-gray-400">
                      اطلاعاتی برای نمایش وجود ندارد.
                    </td>
                  </tr>
                ) : (
                  rowTable.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 transition ${
                        item.imageIndex === activeImageIndex
                          ? "bg-yellow-100"
                          : "bg-white"
                      }`}
                    >
                      <td className="px-2 py-3">{item.First_Name}</td>
                      <td className="px-2 py-3">{item.Last_Name}</td>
                      <td className="px-2 py-3">{item.Father_Name}</td>
                      <td className="px-2 py-3">{item.National_ID}</td>
                      <td className="px-2 py-3">{item.Personal_ID}</td>
                      <td className="px-2 py-3">{item.Birth_Date}</td>
                      <td className="px-2 py-3">{item.Home_Address}</td>
                      <td className="px-2 py-3">{item.Job}</td>
                      <td className="px-2 py-3">{item.Postal_Code}</td>
                      <td className="px-2 py-3">
                        {item.Place_of_issuance_of_birth_certificate}
                      </td>
                      <td className="px-2 py-3">{item.Maritalstatus}</td>
                      <td className="px-2 py-3">{item.Education}</td>
                      <td className="px-2 py-3">{item.Field_of_study}</td>
                      <td className="px-2 py-3">{item.Number_Of_Child}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* نمایش کارت‌ها در موبایل */}
            <div className="sm:hidden space-y-4">
              {rowTable.length === 0 ? (
                <div className="text-center text-gray-400 py-4">
                  اطلاعاتی برای نمایش وجود ندارد.
                </div>
              ) : (
                rowTable.map((item, index) => (
                  <div
                    key={index}
                    className={`border p-4 rounded shadow ${
                      item.imageIndex === activeImageIndex
                        ? "bg-yellow-100"
                        : "bg-white"
                    }`}
                  >
                    <div className="mb-2">
                      <strong>نام:</strong> {item.First_Name}
                    </div>
                    <div className="mb-2">
                      <strong>نام خانوادگی:</strong> {item.Last_Name}
                    </div>
                    <div className="mb-2">
                      <strong>نام پدر:</strong> {item.Father_Name}
                    </div>
                    <div className="mb-2">
                      <strong>کد ملی:</strong> {item.National_ID}
                    </div>
                    <div className="mb-2">
                      <strong>شماره شناسنامه:</strong> {item.Personal_ID}
                    </div>
                    <div className="mb-2">
                      <strong>تاریخ تولد:</strong> {item.Birth_Date}
                    </div>
                    <div className="mb-2">
                      <strong>آدرس:</strong> {item.Home_Address}
                    </div>
                    <div className="mb-2">
                      <strong>شغل:</strong> {item.Job}
                    </div>
                    <div className="mb-2">
                      <strong>کد پستی:</strong> {item.Postal_Code}
                    </div>
                    <div className="mb-2">
                      <strong>محل تولد:</strong>{" "}
                      {item.Place_of_issuance_of_birth_certificate}
                    </div>
                    <div className="mb-2">
                      <strong>تاهل:</strong> {item.Maritalstatus}
                    </div>
                    <div className="mb-2">
                      <strong>تحصیلات:</strong> {item.Education}
                    </div>
                    <div className="mb-2">
                      <strong>گرایش:</strong> {item.Field_of_study}
                    </div>
                    <div className="mb-2">
                      <strong>تعداد فرزند:</strong> {item.Number_Of_Child}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
