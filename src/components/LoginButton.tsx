import React from 'react';

interface LoginButtonProps {}

const LoginButton: React.FC<LoginButtonProps> = () => {
  return (
    <button 
      type="submit" 
      className="px-11 py-3 mt-20 mr-7 ml-7 text-7xl font-bold tracking-tighter text-black whitespace-nowrap bg-blue-700 rounded-[50px] max-md:px-5 max-md:mx-2.5 max-md:mt-10 max-md:text-4xl"
    >
      Entrar
    </button>
  );
};

export default LoginButton;