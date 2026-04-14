import React from 'react';
import { Link as LinkIcon, FileText, Users, RefreshCw, ArrowRight } from 'lucide-react';
import { PermissionItem } from './PermissionItem';

interface AuthModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 p-8 text-center">
      <div className="flex items-center justify-center space-x-6 mb-8">
        <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm">😊</div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="w-12 h-px bg-gray-200 border-dashed border-t" />
          <LinkIcon className="w-5 h-5 text-gray-300 mx-2" />
          <div className="w-12 h-px bg-gray-200 border-dashed border-t" />
          <div className="w-2 h-2 rounded-full bg-gray-200" />
        </div>
        <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-gray-800 shadow-sm">A</div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">授權 Apollo 連接至 Worky</h3>
      <p className="text-sm text-gray-500 mb-8">ABC 咖啡集團 (ABC-GROUP-99)</p>
      <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-6 mb-8">
        <PermissionItem icon={<FileText className="text-gray-400" />} title="Post Jobs" desc="在 Worky 平台代為上架職缺" />
        <PermissionItem icon={<Users className="text-gray-400" />} title="Read Applications" desc="讀取並同步應徵者資料" />
        <PermissionItem icon={<RefreshCw className="text-gray-400" />} title="Sync Data" desc="雙向同步招募進度與出勤" />
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={onClose} className="flex-1 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition-colors">取消</button>
        <button onClick={onConfirm} className="flex-1 py-4 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg flex items-center justify-center">
          授權連接 <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  </div>
);
