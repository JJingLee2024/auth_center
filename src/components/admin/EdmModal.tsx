import React, { useState } from 'react';
import { X, Mail, Bell, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface EdmModalProps {
  customerName: string;
  permissionName: string;
  onClose: () => void;
  onSend: (data: { message: string; channels: string[] }) => void;
}

export const EdmModal: React.FC<EdmModalProps> = ({ customerName, permissionName, onClose, onSend }) => {
  const [message, setMessage] = useState(`親愛的客戶您好，我們注意到您尚未訂閱「${permissionName}」功能。現在訂閱即可享受完整服務...`);
  const [channels, setChannels] = useState<string[]>(['email']);

  const toggleChannel = (channel: string) => {
    setChannels(prev => prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">編輯訂閱推廣訊息</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        
        <div className="p-8 space-y-6">
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">發送對象</label>
            <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-xl inline-block">
              {customerName}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">訊息內容</label>
            <textarea 
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full h-32 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">發送通道</label>
            <div className="flex space-x-3">
              <button 
                onClick={() => toggleChannel('email')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border transition-all ${channels.includes('email') ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-400'}`}
              >
                <Mail className="w-4 h-4" /> <span className="text-xs font-bold">電子郵件</span>
              </button>
              <button 
                onClick={() => toggleChannel('push')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border transition-all ${channels.includes('push') ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-400'}`}
              >
                <Bell className="w-4 h-4" /> <span className="text-xs font-bold">站內通知</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 flex space-x-4">
          <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-500">取消</button>
          <button 
            onClick={() => onSend({ message, channels })}
            className="flex-1 py-3 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center"
          >
            <Send className="w-4 h-4 mr-2" /> 立即發送
          </button>
        </div>
      </motion.div>
    </div>
  );
};
