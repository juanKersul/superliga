import React, { useState } from 'react';

interface FormProps {
  uploadCsv: (file: File) => Promise<any>;
}

const Form: React.FC<FormProps> = ({ uploadCsv }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('No has seleccionado ningún archivo.');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      if (event.target.files[0].name.endsWith('.csv')) {
        setMessage(`${event.target.files[0].name} seleccionado.`);
      } else {
        setMessage('El archivo seleccionado no es un archivo CSV.');
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      setMessage('');
      try {
        const result = await uploadCsv(selectedFile);
        setMessage('Archivo cargado exitosamente.');
        console.log('Resultado:', result);
      } catch (error) {
        setMessage('Error al cargar el archivo.');
        console.error('Error:', error);
      }
    } else {
      setMessage('No has seleccionado ningún archivo.');
    }
  };

  return (
    <div className={`w-72 mx-auto h-3/5 bg-white rounded-lg shadow-md p-6 flex flex-col ml-20 mt-16`}>
      <div className="mb-4 flex">
        <label
          htmlFor="file-upload"
          className="flex items-center cursor-pointer"
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full inline-flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <div className='flex flex-col'>
          <span className="ml-3 font-bold text-black">añadir archivos</span>
          <span className=" ml-3 text-gray-400 text-xs">el archivo debe ser .csv</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        {message && <p className="text-gray-400">{message}</p>}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-auto py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        Enviar
      </button>
    </div>
  );
};

export default Form;







