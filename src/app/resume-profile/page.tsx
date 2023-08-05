"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import Resume from "components/Resume";
import { useState } from "react";
import { useRouter } from "next/router";
import { PDFCard } from "components/Profile/PDFCard";
import { AddPDF } from "components/Profile/AddPdf";
import moment from 'moment';
import 'moment/locale/ru';


const data = [
  {
    name: 'Резюме 1',
    summary: 'описание Резюме 1',
    date: new Date('2023-08-05'),
  },
  {
    name: 'Резюме 2',
    summary: 'описание Резюме 2',
    date: new Date('2023-08-06'),
  },
  {
    name: 'Резюме 3',
    summary: 'описание Резюме 3',
    date: new Date('2023-08-07'),
  },
  {
    name: 'Резюме 4',
    summary: 'описание Резюме 4',
    date: new Date('2023-08-08'),
  },
  {
    name: 'Резюме 5',
    summary: 'описание Резюме 5',
    date: new Date('2023-08-09'),
  },
  {
    name: 'Резюме 6',
    summary: 'описание Резюме 6',
    date: new Date('2023-08-10'),
  },
];


moment.locale('ru')

let arr = new Array(7).fill(1)

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'resume' | 'responses'>('resume');

  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        <div className="grid grid-cols-1 max-md:grid-cols-6 ">

          <div className="mx-10 my-20 grid grid-cols-6 gap-x-20 gap-y-20 ">
            <AddPDF/>
            {data.map((el, i) => {
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
      </main>
    </Provider>
  );
}