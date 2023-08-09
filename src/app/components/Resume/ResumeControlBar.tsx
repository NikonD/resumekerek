"use client";
import { useEffect } from "react";
import { useSetDefaultScale } from "components/Resume/hooks";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import useUser from "lib/useUser";
import { toast } from 'react-toastify';
import axios from "axios";

const ResumeControlBarComponent = ({
  resume,
  scale,
  setScale,
  documentSize,
  document,
  fileName,
}: {
  resume: any
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
}) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  const user = useUser()

  const [instance, update] = usePDF({ document });


  //useUser(): id 
  const downloadPDF = () => {
    if (user) {
      fetch(instance.url || "")
        .then(response => response.blob())
        .then(blobData => {
          const reader = new FileReader();
          reader.onload = async () => {
            if (typeof reader.result === 'string') {
              const base64Data = reader.result;
              console.log(base64Data);
              // await axios.post('http://193.122.54.25:5000/api/resume/create')
              
              const token = localStorage.getItem('token');

              await axios.post('http://193.122.54.25:5000/api/resume/upload/pdf', { data: base64Data, fileName: fileName, resumeObject: resume }, { headers: { Authorization: `Bearer ${token}` } })//user_id
                .then(response => {
                  toast.success("Файл сохранен")
                  let a = window.document.createElement('a')
                  a.href = instance.url || ""
                  a.download = fileName
                  a.click()
                })
                .catch(error => {
                  toast.error("Ошибка сервера")
                });
            } else {
              console.error('File reader result is not a string.');
            }
          };
          reader.readAsDataURL(blobData);
        })
        .catch(error => console.error('Error:', error));

    }
    else {
      toast.error("Вы не авторизированы или не имеете подписку")
    }

  }

  // Hook to update pdf when document changes
  useEffect(() => {
    update(document);
  }, [update, document]);

  return (
    <div className="sticky bottom-0 left-0 right-0 flex h-[var(--resume-control-bar-height)] items-center justify-center px-[var(--resume-padding)] text-gray-600 lg:justify-between">
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={scale}
          onChange={(e) => {
            setScaleOnResize(false);
            setScale(Number(e.target.value));
          }}
        />
        <div className="w-10">{`${Math.round(scale * 100)}%`}</div>
        <label className="hidden items-center gap-1 lg:flex">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4"
            checked={scaleOnResize}
            onChange={() => setScaleOnResize((prev) => !prev)}
          />
          <span className="select-none">Autoscale</span>
        </label>
      </div>
      <button onClick={downloadPDF} className="ml-1 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 lg:ml-8" >
        <ArrowDownTrayIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">Download Resume</span>
      </button>
      {/* <a
        className="ml-1 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 lg:ml-8"
        href={instance.url!}
        download={fileName}
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">Download Resume</span>
      </a> */}
    </div>
  );
};

// Make ResumeControlBar dynamic to make nextjs happy
export const ResumeControlBar = dynamic(
  () => Promise.resolve(ResumeControlBarComponent),
  {
    ssr: false,
  }
);

export const ResumeControlBarBorder = () => (
  <div className="absolute bottom-[var(--resume-control-bar-height)] w-full border-t-2 bg-gray-50" />
);
