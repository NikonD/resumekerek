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
import config from '../../../../config/config.json'
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "lib/redux/loginSlice";
import { useTranslation } from "react-i18next";
import { clearResume } from "lib/redux/resumeSlice";
import moment from "moment";


const ResumeControlBarComponent = ({
  theme,
  setting,
  resume,
  scale,
  setScale,
  documentSize,
  document,
  fileName,
}: {
  theme: any,
  setting: any,
  resume: any
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
}) => {
  const { t } = useTranslation()

  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  const user = useSelector(selectUser)
  const dispath = useDispatch()
  const [instance, update] = usePDF({ document });

  console.log("settings", setting)

  const currentDate = moment()
  const isTargetDatePast = moment(user.active_until).isBefore(currentDate);

  //useUser(): id 
  const downloadPDF = () => {
    if (user.islogin && !isTargetDatePast) {
      fetch(instance.url || "")
        .then(response => response.blob())
        .then(blobData => {
          const reader = new FileReader();
          reader.onload = async () => {
            if (typeof reader.result === 'string') {
              const base64Data = reader.result;
              console.log(base64Data);

              const token = localStorage.getItem('token');
              
              await axios.post(`${config.API_URL}/api/resume/upload/pdf`, {
                data: base64Data,
                fileName: fileName,
                resumeObject: resume,
                theme: theme,
                settings: setting
              }, { headers: { Authorization: `Bearer ${token}` } })//user_id
                .then(response => {
                  toast.success(t("file-saved-notify"))
                  let a = window.document.createElement('a')
                  a.href = instance.url || "" 
                  a.download = fileName
                  console.log("FILE", instance.url)
                  a.click()
                })
                .catch(error => {
                  toast.error(t("server-error-notify"))
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
      toast.error(t("not-logged-in-or-not-have-subscription"))
    }

  }

  // Hook to update pdf when document changes
  useEffect(() => {
    update(document);
  }, [update, document]);

  return (
    <div className="sticky bottom-0 left-0 right-0 flex lg:flex-row flex-col lg:py-[0px] my-[50px] h-[var(--resume-control-bar-height)] items-center justify-center px-[var(--resume-padding)] text-gray-600 lg:justify-between ">
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        <input
          type="range"
          min={0.3}
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
          <span className="select-none">{t("auto-scale")}</span>
        </label>
      </div>
      <button
        className="w-full flex justify-center items-center lg:text-unset text-[1.3rem] ml-1 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 lg:ml-8"
        onClick={() => {
          dispath(clearResume(resume))
        }}>
        {t('reset')}
      </button>
      <button onClick={downloadPDF} className="w-full flex justify-center items-center text-[1.3rem] ml-1 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 lg:ml-8" >
        <ArrowDownTrayIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">{t("download-resume-button")}</span>
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
