/* eslint-disable jsx-a11y/alt-text */
import React, {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useId,
  useState,
} from "react";
import { OptionalTypeNode } from "typescript";
import { OutputImageCard } from "./OutputImageCard";
import {
  SRImagesAddresses,
  download,
  getSRFaces,
  getSRFaceAndScene,
  getSRScene,
  getFile,
} from "../service";
import { useRef } from "react";
import { SRTypes } from "../enums";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  useReactCompareSliderRef,
} from "react-compare-slider";

type CardProps = {
  width?: string;
  height?: string;
  children?: any;
  [key: string]: any;
};

export function Card({ width, height, children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={"sr-card " + props.className}
      style={{
        width,
        height,
      }}
    >
      <div className="sr-card-container">{children}</div>
    </div>
  );
}

const CardDefault = (props: CardProps) => (
  <Card {...props}>
    {" "}
    <img src="/icon/NoPhoto.png" />{" "}
  </Card>
);

function setPromiseTimeOut(callback: () => void, delay: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      callback();
      resolve(true);
    }, delay)
  );
}

type ImageCompareProps = {
  firstImage: File | string;
  secondImage: File | string;
  className?: string;
};
export function ImgCompareSlider({
  firstImage,
  secondImage,
  className,
}: ImageCompareProps) {
  const showImageDuration = 1400;
  const [transition, setTransition] = useState(showImageDuration);
  // let sliderRef = useReactCompareSliderRef();
  const [position, setPosition] = useState(1);

  useEffect(() => {
    async function showImage() {
      if (position > 1) {
        setTransition(350);
        setPosition(1);
      }

      if (transition !== showImageDuration)
        await setPromiseTimeOut(() => setTransition(showImageDuration), 10);

      await setPromiseTimeOut(() => setPosition(90), 500);
      await setPromiseTimeOut(() => setTransition(100), showImageDuration);
    }
    showImage();
  }, [secondImage]);

  let src1 =
    secondImage instanceof File
      ? URL.createObjectURL(secondImage)
      : secondImage;
  let src2 =
    firstImage instanceof File ? URL.createObjectURL(firstImage) : firstImage;

  return (
    <ReactCompareSlider
      // ref={sliderRef}
      dir="ltr"
      position={position}
      transition={transition + "ms ease-out"}
      className={"w-full " + className}
      itemOne={<ReactCompareSliderImage src={src1} />}
      itemTwo={<ReactCompareSliderImage src={src2} />}
    />
  );
}

type FinalImageResultProps = {
  beforFile?: File | string | null;
  afterFile?: File | string | null;
  onResultLoad?: (data: string) => void;
};
export function FinalImageResult({
  beforFile,
  afterFile,
  onResultLoad,
}: FinalImageResultProps) {
  const [firstUrl, setFirstUrl] = useState<string | null>(null);
  const [secondUrl, setSecondUrl] = useState<string | null>(null);

  useEffect(() => {
    async function download(f: File | string) {
      let file = typeof f === "string" ? await getFile(f) : f;

      return URL.createObjectURL(file);
    }

    if (beforFile) download(beforFile).then((u) => setFirstUrl(u));
    else setFirstUrl(null);

    if (afterFile)
      download(afterFile).then((u) => {
        onResultLoad && onResultLoad(u);
        setSecondUrl(u);
      });
    else setFirstUrl(null);

    return () => {
      if (firstUrl) URL.revokeObjectURL(firstUrl);

      if (secondUrl) URL.revokeObjectURL(secondUrl);
    };
  }, [beforFile, afterFile]);

  if (!firstUrl && !secondUrl) return null;

  return (
    <Card className="w-full min-h-96 max-h-screen m-2 md:w-3/5">
      {firstUrl && secondUrl ? (
        <>
          <ImgCompareSlider
            firstImage={firstUrl}
            secondImage={secondUrl}
            className="rounded-lg"
          />
        </>
      ) : (
        <img className="w-full rounded-lg h-[max-content]" src={firstUrl!} />
      )}
    </Card>
  );
}

export default function Container() {
  const [fidelity, setFidelity] = useState(0.5);
  const fidelityElementId = useId();

  const [srType, setSrType] = useState(SRTypes.FaceAndScene);

  const [status, setStatus] = useState<
    "normal" | "processing" | "downloading" | "done"
  >("normal");
  const statusText =
    status === "processing"
      ? "در حال پردازش"
      : status === "downloading"
      ? "در حال دانلود"
      : status === "done"
      ? "انجام شد"
      : "بهبود کیفیت تصویر";

  const fileEl = useRef<HTMLInputElement>(null);
  const fileInputId = useId();
  const [image, setImage] = useState<File | null>(null);

  const [imagePaths, setImagePaths] = useState<SRImagesAddresses | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      setImage(selectedFile);
      setImagePaths(null);
      setStatus("normal");
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("فایلی انتخاب نشده است.");
      return;
    }

    if (status === "downloading" || status === "processing") {
      alert(
        `تصویر از قبل ${statusText} است لطفا کمی صبر کنید یا در صورت تمایل عملیات مورد نظر را تغییر دهید.`
      );
      return;
    }

    // if (status === "done") {
    //   alert("این تصویر از قبل پردازش شده است.");
    //   return;
    // }

    if (imagePaths) setImagePaths(null);

    let result: SRImagesAddresses | null = null;
    setStatus("processing");
    // console.log(SRTypes.SceneOnly);
    try {
      switch (srType) {
        case SRTypes.FaceAndScene: {
          result = await getSRFaceAndScene(image);
          break;
        }
        case SRTypes.FaceOnly: {
          result = await getSRFaces({
            fidelity,
            image,
          });
          break;
        }
        case SRTypes.SceneOnly: {
          let addr = await getSRScene(image);
          if (addr) {
            result = {
              final: addr,
            };
          } else result = null;
          break;
        }
      }
      console.log(result);
    } catch (err) {
      console.error(err);
      alert("دریافت عکس ها با شکست مواجه شد.");
      setStatus("normal");
      return;
    }

    if (!result) {
      alert("در پردازش اطلاعات مشکلی به وجود آمده است.");
      setStatus("normal");
      return;
    }

    setImagePaths(result);
    setStatus("downloading");
  };

  const handleDownloadAll = async () => {
    if (!imagePaths) return;

    download(imagePaths.zipFile!, {
      internalDownload: false,
    });
  };

  const handleChangeSrType = (e: ChangeEvent<HTMLSelectElement>) => {
    let newType = parseInt(e.target.value) as SRTypes;
    setSrType(newType);
    if (image) setStatus("normal");
  };
  useEffect(() => {
    if (image) {
      setStatus("normal");
      handleSubmit();
    }
  }, [srType, fidelity]);

  return (
    <div dir="rtl" className="sr-container m-auto">
      <div className="flex flex-wrap justify-around">
        <Card className="w-full min-h-96 max-h-[400px] m-2 sm:w-3/5 md:w-2/6">
          <div className="flex w-full h-full justify-center items-center flex-wrap">
            <div className="w-11/12 my-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor={fileInputId}
              >
                انتخاب عکس
              </label>
              <input
                ref={fileEl}
                id={fileInputId}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                type="file"
                multiple={false}
                onChange={handleImageChange}
              />
            </div>

            <div className="w-11/12 my-2">
              <div className="w-full min-w-[200px]">
                <div className="relative">
                  <select
                    value={srType}
                    onChange={handleChangeSrType}
                    className="w-full !bg-none placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                  >
                    <option value={SRTypes.FaceAndScene}>صورت و منظره</option>
                    <option value={SRTypes.FaceOnly}>فقط صورت</option>
                    <option value={SRTypes.SceneOnly}>فقط منظره</option>
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.2"
                    stroke="currentColor"
                    className="h-5 w-5 ml-1 absolute top-2.5 left-2.5 text-slate-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </div>
                <p className="flex items-center mt-2 text-xs text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  انتخاب مدل و نحوه بهبود کیفیت
                </p>
              </div>
            </div>

            <div className="flex w-11/12 my-2 flex-wrap items-center justify-around">
              <div className="sr-card-field w-full flex items-center p-2">
                <div className="relative mb-6 w-full">
                  <input
                    id={fidelityElementId}
                    type="range"
                    onChange={(e) => setFidelity(parseFloat(e.target.value))}
                    value={fidelity}
                    step={0.1}
                    min={0}
                    max={1}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 absolute start-0 -bottom-5">
                    کیفیت
                  </span>
                  <span className="text-sm text-gray-600 absolute end-0 -bottom-5">
                    وفاداری
                  </span>
                </div>
              </div>
            </div>

            <div className="w-11/12 my-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {statusText}
              </button>
            </div>

            {!imagePaths?.zipFile ? null : (
              <div className="w-11/12 my-2">
                <button
                  onClick={handleDownloadAll}
                  className="w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    <svg
                      className="inline fill-current w-4 h-4 mx-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    دانلود همه تصاویر
                  </span>
                </button>
                {/* <button onClick={handleDownloadAll}
                className="w-full align-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                <span>دانلود همه</span>
                </button> */}
                {/* (<button onClick={handleDownloadAll} className="px-3 py-2 bg-green-700 text-white rounded w-1/2">دانلود همه تصاویر</button>) */}
              </div>
            )}
          </div>
        </Card>

        <FinalImageResult
          beforFile={image}
          afterFile={imagePaths?.final}
          onResultLoad={() => setStatus("done")}
        />
      </div>

      <div className="flex flex-col">
        {!imagePaths?.parts?.length ? null : (
          <>
            <hr className="m-3" />
            <h2 className="font-black text-2xl m-auto">صورت های داخل تصویر</h2>
            <div className="flex flex-wrap justify-around">
              {imagePaths?.parts.map((path) => (
                <div className="m-4">
                  <OutputImageCard imageUrl={path} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
