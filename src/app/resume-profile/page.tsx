"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import Resume from "components/Resume";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PDFCard } from "components/Profile/PDFCard";
import { AddPDF } from "components/Profile/AddPdf";
import moment from 'moment';
import 'moment/locale/ru';
import { ServicesPage } from "components/Profile/ServiceSection";
import { PDFListSection } from "components/Profile/PDFSection";
import { IResume } from "components/Profile/types";
import axios from "axios";
import { TopNavBar } from "components/TopNavBar";


let arr = new Array(7).fill(1)

export default function Profile() {
 

  const [activeTab, setActiveTab] = useState<'resume' | 'responses'>('resume');

  return (
    <Provider store={store}>
      <TopNavBar/>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        <ServicesPage />

        <PDFListSection  />
      </main>
    </Provider>
  );
}