// components/InputField.tsx
import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    id: string;
    type: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ id, type, name, value, onChange, placeholder, required }) => (
    <div>
        <label htmlFor={id} className="text-sm font-medium text-gray-700 block mb-2">
            {id} *
        </label>
        <input
            type={type}
            id={id}
            name={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
    </div>
);

export default InputField;
