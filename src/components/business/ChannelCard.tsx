import React from 'react';
import { CheckCircle2, Lock, AlertTriangle } from 'lucide-react';

interface ChannelCardProps {
  title: string;
  desc: string;
  status: 'ready' | 'auth' | 'incomplete';
  icon: string;
  onClick?: () => void;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ title, desc, status, icon, onClick }) => {
  const isSelected = title === 'Apollo 直招';
  return (
    <div 
      onClick={onClick} 
      className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer group h-full flex flex-col ${isSelected ? 'border-green-500 bg-green-50/20' : 'border-gray-100 bg-white hover:border-blue-200'}`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-green-500 rounded-full p-0.5">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
      )}
      <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-xl shadow-sm mb-4">
        {icon}
      </div>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-[11px] text-gray-400 leading-relaxed mb-4 flex-1">{desc}</p>
      {status === 'ready' && (
        <span className="flex items-center text-xs font-bold text-green-600">
          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 已就緒
        </span>
      )}
      {status === 'auth' && (
        <span className="flex items-center text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md w-fit">
          <Lock className="w-3 h-3 mr-1" /> 需授權
        </span>
      )}
      {status === 'incomplete' && (
        <span className="flex items-center text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md w-fit">
          <AlertTriangle className="w-3 h-3 mr-1" /> 資料不完整
        </span>
      )}
    </div>
  );
};
