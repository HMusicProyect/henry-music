import React from 'react';

interface Option {
  id: number;
  name: string;
}

interface Props {
  id: string;
  label: string;
  options: Option[];
  isLoading: boolean;
  error: string | null;
  register: any;
  required: boolean;
}

const SelectInput: React.FC<Props> = ({ id, label, options, isLoading, error, register, required }) => {
  return (
    <div key={id}>
      <select
        className='flex h-12 w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus-outline'
        id={id}
        disabled={isLoading}
        {...register(id, { required })}
      >
        <option disabled value="">Seleccione {label}</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p>Error al cargar los {label.toLowerCase()}: {error}</p>}
    </div>
  );
};

export default SelectInput;
