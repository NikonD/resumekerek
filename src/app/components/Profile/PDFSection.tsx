"use client";
import React, { useEffect, useState } from "react"
import { IResume } from "./types"
import { AddPDF } from "./AddPdf"
import { PDFCard } from "./PDFCard"
import moment from 'moment';
import 'moment/locale/ru';
import axios from "axios";

moment.locale('ru')

interface PDFListSectionProps {
  resumes: []
}

let PDFListSection = () => {
  
  const [resumes, setResumes] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.post("http://193.122.54.25:5000/api/resume/list", {}, { headers: { Authorization: `Bearer ${token}` } })
    .then((response)=>{
      let resumes = response.data
      setResumes(resumes)
    }).catch((err)=>{
      console.error("Failed to getting resumes list", (err as Error).message)
    })
  }, [])

  console.log(resumes)

  return (
    <div className='bg-white'>
      <h1 className="text-3xl font-bold text-center py-8">Резюме</h1>
      <div className="flex justify-center items-center  ">
        <div className="grid grid-cols-1 max-md:grid-cols-6 ">

          <div className="mx-10 my-20 grid grid-cols-6 max-sm:grid-cols-1 gap-x-20 gap-y-20 ">
            <AddPDF/>
            {resumes.length!=0 && resumes?.map((el: IResume, i: number) => {
              return (
                <PDFCard key={i}>
                  <h1 className="text-4xl font-bold">{el.filename}</h1>
                  <p className="text-lg">{el.resume.profile.summary}</p>
                  <p className="absolute bottom-0 right-0 text-sm">{moment(el.created_at).format('LL')}</p>
                </PDFCard>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export { PDFListSection }