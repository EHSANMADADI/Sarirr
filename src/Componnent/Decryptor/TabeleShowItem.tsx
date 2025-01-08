import React, { useState } from "react";
import axios from "axios";

interface ItemTable {
  saveItems: { file: any; name: string; size: number; status: string }[];
  setSaveItems: React.Dispatch<
    React.SetStateAction<
      { name: string; size: number; status: string; file: any }[]
    >
  >;
}

export default function TabeleShowItem({ saveItems, setSaveItems }: ItemTable) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const startProgress = (index: number) => {
    setLoading(true);
    const file = saveItems[index].file;
    console.log(file);

    const formData = new FormData();
    formData.append("files", file);

    axios
      .post("http://192.168.4.161:5000/api/auth", {
        login: "ehsan",
        password: "123456",
      })
      .then((response) => {
        setToken(response.data.accessToken);
        axios
          .post("http://192.168.4.161:5000/api/UploadesFile", formData, {
            headers: {
              Authorization: `Bearer ${response.data.accessToken}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            const match = res.data.match(/Process id = (\d+)/);
            if (match) {
              var processId = match[1]; // مقدار id
              console.log("Process ID:", processId);
            }
            axios
              .get(
                `http://192.168.4.161:5000/api/result?request_id=${processId}`,
                {
                  headers: {
                    Authorization: `Bearer ${response.data.accessToken}`,
                  },
                }
              )
              .then((res) => console.log(res.data.jobs));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div dir="rtl" className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام فایل
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت
              </th>
            </tr>
          </thead>
          <tbody>
            {saveItems.map((seaveItem, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white  even:bg-gray-50  border-b hover:bg-gray-200 cursor-pointer hover:scale-110 duration-200 "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {seaveItem.name}
                  </th>
                  <td
                    onClick={() => startProgress(index)}
                    className="px-6 py-4"
                  >
                    {loading && <span>loading...</span>}
                    {!loading && <span>{seaveItem.status}</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
