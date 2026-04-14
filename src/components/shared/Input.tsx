import React from 'react';

interface InputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, placeholder, required }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      type="text" 
      className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm" 
      placeholder={placeholder} 
    />
  </div>
);
