import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text' }) => {
  const id = label.toLowerCase().replace(' ', '-');

  return (
    <>
      <label htmlFor={id} className="self-start mt-12 text-xl font-bold tracking-tight text-black max-md:mt-10 max-md:ml-0.5">
        {label}
      </label>
      <input 
        type={type} 
        id={id} 
        className="flex shrink-0 mt-2.5 max-w-full bg-zinc-300 h-[87px] w-[351px] max-md:ml-0.5" 
        aria-label={label}
      />
    </>
  );
};

export default InputField;