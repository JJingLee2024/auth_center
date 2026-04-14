import React from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RedirectIframeModalProps {
  url: string;
  onClose: () => void;
}

export const RedirectIframeModal: React.FC<RedirectIframeModalProps> = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        className="relative w-full max-w-5xl h-full bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/20"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">安全重新導向</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-600 font-medium flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                  已帶入授權憑證
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-[10px] font-mono text-gray-400 truncate max-w-[200px] sm:max-w-md">
                  {url}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => window.open(url, '_blank')}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-blue-600 group"
              title="在新分頁開啟"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-red-50 rounded-xl transition-colors text-gray-400 hover:text-red-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 bg-slate-50 relative group">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-xs font-medium text-gray-500 border border-gray-100">
              正在載入加密內容...
            </div>
          </div>
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            title="Redirect Content"
            onLoad={() => console.log('Iframe loaded')}
          />
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
            Apollo Secure Gateway v2.4
          </p>
          <div className="flex items-center space-x-4">
             <span className="text-[10px] text-gray-400">加密等級: AES-256</span>
             <span className="text-[10px] text-gray-400">來源: Worky Sync Engine</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
