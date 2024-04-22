// PasswordChangeForm.tsx
import React from 'react';

type PasswordChangeFormProps = {
    handleCurrentPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    verifyCurrentPassword: () => void;
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    passwordFieldsEnabled: boolean;
    onSubmit: (event: React.FormEvent) => void; 
};

export const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
    handleCurrentPasswordChange,
    verifyCurrentPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    passwordFieldsEnabled,
    onSubmit,
}) => (
    <>
    <form onSubmit={onSubmit}> 
        <div className="mb-4">
            <label 
                className="block text-gray-700 text-sm font-bold mb-2" 
                htmlFor="currentPassword"
            >
                Contraseña actual:
            </label>
            <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                type="password" 
                id="currentPassword" 
                onChange={handleCurrentPasswordChange} 
            />
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={verifyCurrentPassword}
            >
                Verificar contraseña
            </button>
        </div>
        <div className="mb-4">
            <label 
                className="block text-gray-700 text-sm font-bold mb-2" 
                htmlFor="password"
            >
                Nueva Contraseña:
            </label>
            <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                type="password" 
                id="password" 
                onChange={handlePasswordChange} 
                disabled={!passwordFieldsEnabled}
            />
        </div>
        <div className="mb-6">
            <label 
                className="block text-gray-700 text-sm font-bold mb-2" 
                htmlFor="confirmPassword"
            >
                Confirmar Contraseña:
            </label>
            <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                type="password" 
                id="confirmPassword" 
                onChange={handleConfirmPasswordChange}
                disabled={!passwordFieldsEnabled}
            />
        </div>
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" // Asegúrate de que el botón sea de tipo "submit" para que pueda enviar el formulario
        >
            Cambiar Contraseña
        </button>
    </form>
    </>
);