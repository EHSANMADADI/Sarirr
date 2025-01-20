/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { OutputImageCard } from "./OutputImageCard";
import { SRImagesAddresses, download, getSRFaces } from "./service";

type CardProp = {
  width?: string;
  height?: string;
  children?: any;
  [key: string]: any;
};

export function Card({ width, height, children, ...props }: CardProp) {
  width ??= "400px";
  height ??= "300px";

  return (
    <div
      {...props}
      className={"sr-card m-2 " + props.className}
      style={{
        width,
        height,
      }}
    >
      <div className="sr-card-container">{children}</div>
    </div>
  );
}

const CardDefault = (props: CardProp) => (
  <Card {...props}>
    {" "}
    <img src="/icon/NoPhoto.png" />{" "}
  </Card>
);

export default function Container() {
  const [fidelity, setFidelity] = useState(0.5);
  const [image, setImage] = useState<File | null>(null);
  const [imagePaths, setImagePaths] = useState<SRImagesAddresses | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      setImage(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("فایلی انتخاب نشده است.");
      return;
    }

    let result = await getSRFaces({
      fidelity,
      image,
    });

    if (!result) {
      alert("دریافت عکس ها با شکست مواجه شد.");
      return;
    }

    setImagePaths(result);
  };

  const handleDownloadAll = async () => {
    if (!imagePaths)
      return;

    download(imagePaths.zipFile, {
      internalDownload: false
    })
  }

  return (
    <div dir="rtl" className="sr-container m-auto">
      <div className="flex flex-wrap xl:justify-between justify-center">
        <Card width="550px" height="350px" className="max-w-full">
          <input
            type="file"
            multiple={false}
            onChange={handleImageChange}
          ></input>
        </Card>
        <Card width="550px" height="350px" className="max-w-full">
          <div className="flex w-full h-full justify-center items-center flex-wrap">
            <div className="w-4/5">
              <button
                disabled
                className="w-full bg-gray-400"
                style={{
                  // backgroundColor: "#184193",
                  color: "white",
                  borderRadius: "15px",
                  height: "60px",
                  textAlign: "center",
                }}
              >
                {" "}
                تنظیمات مدل و قیاس افزایش سایز{" "}
              </button>
            </div>

            <div className="flex flex-wrap items-center w-full justify-around">
              <div className="w-2/6 bg-gray-400 p-1 rounded">
                <span>بزرگ نمایی:</span>
                <select disabled>
                  <option>مقدار 1</option>
                  <option>مقدار 2</option>
                  <option>مقدار 3</option>
                </select>
              </div>

              <div className="sr-card-field w-3/6 flex items-center p-2">
                <span>شباهت</span>
                <span>
                  <input
                    type="range"
                    onChange={(e) => setFidelity(parseFloat(e.target.value))}
                    value={fidelity}
                    step={0.1}
                    min={0}
                    max={1}
                  />
                </span>
                <span>کیفیت</span>
              </div>
            </div>

            <div className="w-4/5">
              <button
                className="w-full"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#39A77A",
                  color: "white",
                  borderRadius: "15px",
                  height: "60px",
                  textAlign: "center",
                }}
              >
                {" "}
                تایید / انجام عملیات
              </button>
            </div>
          </div>
        </Card>
      </div>



      <div className="flex flex-col">
        {!imagePaths?.final ? null : (
          <>
            <hr className="m-3" />
            <button onClick={handleDownloadAll} className="px-3 py-2 bg-green-700 text-white rounded w-1/2">دانلود همه تصاویر</button>
            <h2 className="font-black text-2xl mb-3">عکس نهایی</h2>
            <Card
              width="100%"
              height="100%"
              style={{
                maxWidht: "100%",
                maxHeight: "50vh",
                borderRadius: "20px",
              }}
            >
              <img src={imagePaths?.final} />
            </Card>
          </>
        )}

        {!imagePaths?.parts.length ? null : (
          <>
            <hr className="m-3" />
            <h2 className="font-black text-2xl mb-3">صورت های داخل تصویر</h2>
            <div className="flex flex-wrap justify-between">
              {imagePaths?.parts.map((path) =>
                (<OutputImageCard imageUrl={path} />)
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}


