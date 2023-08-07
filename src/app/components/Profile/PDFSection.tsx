import React from "react"
import { IResume } from "./types"
import { AddPDF } from "./AddPdf"
import { PDFCard } from "./PDFCard"
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru')

interface PDFListSectionProps {
  resumes: IResume[]
}

let PDFListSection: React.FC<PDFListSectionProps> = ({resumes}) => {
  return (
    <div className='bg-white'>
      <h1 className="text-3xl font-bold text-center py-8">Резюме</h1>
      <div className="flex justify-center items-center  ">
        <div className="grid grid-cols-1 max-md:grid-cols-6 ">

          <div className="mx-10 my-20 grid grid-cols-6 max-sm:grid-cols-1 gap-x-20 gap-y-20 ">
            <AddPDF/>
            {resumes.map((el, i) => {
              return (
                <PDFCard key={i}>
                  <h1 className="text-4xl font-bold">{el.name}</h1>
                  <p className="text-lg">{el.summary}</p>
                  <p className="absolute bottom-0 right-0 text-sm">{moment(el.date).format('LL')}</p>
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