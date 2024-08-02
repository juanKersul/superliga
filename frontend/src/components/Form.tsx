import React, { useState } from 'react';

const Form: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('no has seleccionado ningún archivo');

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

    const handleSubmit = () => {
        if (selectedFile) {
            setMessage('');
        } else {
            setMessage('No has seleccionado ningún archivo.');
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-4 flex items-center justify-center">
                <label
                    htmlFor="file-upload"
                    className="flex items-center cursor-pointer"
                >
                    <div className="w-12 h-12 bg-blue-500 rounded-full inline-flex items-center justify-center text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
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
                <span className="ml-4 font-bold text-black">Seleccionar archivos</span>
            </div>
            <div className="mt-4 text-center" >
                {message && <p className="text-gray-400">{message}</p>}
            </div>
            <div className="text-center mt-4">
                <button
                    onClick={handleSubmit}
                    className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default Form;







