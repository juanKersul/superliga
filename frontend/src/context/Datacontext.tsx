import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getPersons } from '../services/getService';

interface TableData {
  title: string;
  data: Record<string, any>[];
}

interface DataContextType {
  tables: { [key: string]: TableData };
  updateTables: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tables, setTables] = useState<{ [key: string]: TableData }>({});

  const updateTables = async () => {
    try {
      const total = await getPersons({ aggregate: 'COUNT:id' });
      const ageAvg = await getPersons({ aggregate: 'AVG:edad', where: 'equipo=Racing' });
      const marriedWstudies = await getPersons({
        select: 'nombre,edad,equipo',
        where: 'estadoCivil=Casado,nivelDeEstudios=Universitario',
        limit: 100,
        orderBy: 'edad:ASC'
      });
      const names = await getPersons({
        select: 'nombre',
        aggregate: 'COUNT:nombre',
        where: 'equipo=River',
        groupBy: 'nombre',
        orderBy: 'count:DESC'
      });
      const complex = await getPersons({
        select: 'equipo',
        aggregate: 'COUNT:id,AVG:edad,MIN:edad,MAX:edad',
        groupBy: 'equipo',
        orderBy: 'count:DESC'
      });

      setTables({
        Total: { title: 'Total Registradas', data: total },
        ageAvg: { title: 'Edad promedio Socios de Racing', data: ageAvg },
        marriedWstudies: { title: 'Casados con estudios universitarios', data: marriedWstudies },
        names: { title: '5 nombres mas comunes hinchas de river', data: names },
        complex: { title: 'socios y edades por equipo', data: complex }
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    updateTables();
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <DataContext.Provider value={{ tables, updateTables }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

