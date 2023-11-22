import { Tooltip } from 'antd';
import Link from 'next/link';
import React, { Component } from 'react';



export const AddPDF: React.FC = () => {
  return (
    <>
      <Tooltip  title="Перейти на страницу создания резюме">
  
    <div className="hover:bg-gray-100 flex items-center justify-center text-4xl font-bold text-gray-600 w-11/12 bg-white shadow-md p-6">
      <Link href="/resume-builder">
      +
      </Link>
      </div>
      </Tooltip>

      </>
  );
};