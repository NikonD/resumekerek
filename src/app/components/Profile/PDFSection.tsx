"use client";
import React, { useEffect, useState } from "react"
import { IResume } from "./types"
import { AddPDF } from "./AddPdf"
import { PDFCard } from "./PDFCard"
import moment from 'moment';
import 'moment/locale/ru';
import axios from "axios";
import config from '../../../../config/config.json'
import { useSelector } from "react-redux";
import { selectUser } from "lib/redux/loginSlice";
import { selectSettings } from "lib/redux/settingsSlice";
import { useTranslation } from 'react-i18next';

moment.locale('ru')

interface PDFListSectionProps {
  resumes: []
}

let PDFListSection = () => {

  const { t } = useTranslation();


  // console.log("LANG", i18n.resolvedLanguage)
  const [resumes, setResumes] = useState<IResume[] | undefined>(undefined)
  // const [_resumes, _setResumes] = useState<IResume[] | undefined>(undefined)

  const user = useSelector(selectUser)
  const settings = useSelector(selectSettings)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (user.islogin) {
      const token = localStorage.getItem('token');
      axios.post(`${config.API_URL}/api/resume/list`, {}, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          let { status, resumes } = response.data
          if (status == "ok") {
            setResumes(resumes)
          }
          console.log("??", response.data)
        }).catch((err) => {
          console.error("Failed to getting resumes list", (err as Error).message)
        })
    }
    else {
      setResumes(undefined)
    }

  }, [user])

  console.log(resumes)

  return (
    <div className='bg-white'>
      <h1 className="text-3xl font-bold text-center py-8">{t('resumes')}</h1>
      <div className="flex justify-center items-center  ">
        <div className="grid grid-cols-1 max-md:grid-cols-6 ">

          <div className="mx-10 my-20 grid grid-cols-6 max-sm:grid-cols-1 gap-x-20 gap-y-20 ">
            <AddPDF />
            {resumes !== undefined ? resumes.map((el: IResume, i: number) => {

              return (
                <PDFCard onClick={() => {

                  const currentStateJSON = localStorage.getItem("open-resume-state")
                  let currentState: {
                    resume: any,
                    settings: any
                  } = {
                    settings: {},
                    resume: {}
                  };

                  
                  
                  currentState.resume = el.resume;
                  currentState.settings= el.settings

                  localStorage.setItem("open-resume-state", JSON.stringify(currentState));

                  window.location.href = '/resume-builder'
                }} key={i}>
                  <h1 className="text-3xl font-bold">{el.resume?.profile?.name}</h1>
                  <p className="text-lg">{el.resume?.profile?.summary}</p>
                  <p className="absolute bottom-0 right-0 text-sm">{moment(el.created_at).format('DD.MM.YYYY')}</p>
                </PDFCard>
              )
            }) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export { PDFListSection }