import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface ChangeConfirmModalProps {
  onCancel: () => void;
  onConfirm: (sendLetter: boolean) => void;
}

export const ChangeConfirmModal: React.FC<ChangeConfirmModalProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onCancel} 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">確認異動權限？</h3>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          系統偵測到您正在異動客戶權限。異動前是否發出「權限異動用戶授權信」通知相關用戶？
        </p>
        
        <div className="space-y-3">
          <button 
            onClick={() => onConfirm(true)}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
          >
            發送通知並儲存
          </button>
          <button 
            onClick={() => onConfirm(false)}
            className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
          >
            直接儲存 (不發送)
          </button>
          <button 
            onClick={onCancel}
            className="w-full py-3 text-sm font-bold text-gray-400 hover:text-gray-600"
          >
            返回編輯
          </button>
        </div>
      </motion.div>
    </div>
  );
};
