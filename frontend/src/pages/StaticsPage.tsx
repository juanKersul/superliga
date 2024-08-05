// StaticsPage.tsx
import React from 'react';
import { useData } from '../context/Datacontext';
import Spreadsheet from '../components/spreadShet';

const StaticsPage: React.FC = () => {
  const { tables } = useData();

  return (
    <div className='min-h-screen text-white'>
      <Spreadsheet tables={tables} />
    </div>
  );
};

export default StaticsPage;
