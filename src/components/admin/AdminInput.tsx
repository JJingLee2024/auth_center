import React from 'react';

interface AdminInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}

export const AdminInput: React.FC<AdminInputProps> = ({ label, value, onChange, placeholder, type = "text", icon }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-3 text-gray-300">{icon}</div>}
      <input 
        type={type} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder} 
        className={`w-full bg-white border border-gray-200 rounded-xl ${icon ? 'pl-10' : 'px-4'} py-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none font-medium`} 
      />
    </div>
  </div>
);
