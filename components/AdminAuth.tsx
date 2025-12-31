
import React, { useState } from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface AdminAuthProps {
  pin: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ pin, onSuccess, onCancel }) => {
  const [val, setVal] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (val === pin) {
      onSuccess();
    } else {
      setError(true);
      setVal('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 p-6">
      <div className="flex items-center mb-12">
        <button onClick={onCancel} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-medium ml-4">Acceso Restringido</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-xs mx-auto w-full">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert size={32} />
        </div>
        
        <p className="text-center text-gray-600 mb-8">
          Introduce el PIN de administración para continuar.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="password"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="PIN de acceso"
            autoFocus
            className={`w-full bg-white border ${error ? 'border-red-500' : 'border-gray-200'} rounded-2xl px-6 py-4 text-center text-2xl tracking-[1rem] focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm mb-4`}
          />
          {error && <p className="text-red-500 text-sm text-center mb-4">PIN incorrecto</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-4 rounded-2xl shadow-md active:bg-blue-700 transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};
