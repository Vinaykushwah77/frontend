import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col w-full">
      <label className="text-[13px] text-slate-800 mb-1">{label}</label>

      <div className="flex items-center border px-3 py-2 rounded w-full">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm"
          value={value}
          onChange={onChange}
        />

        {type === 'password' && (
          showPassword ? (
            <FaRegEye
              size={18}
              className="text-purple-600 cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={18}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
