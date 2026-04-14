import React, { useState } from 'react';
import { LayoutGrid, Package, CheckCircle2 } from 'lucide-react';
import { GroupConfig, AuthConfig } from '../../types';
import { AdminInput } from './AdminInput';

interface GroupEditDrawerProps {
  group: GroupConfig;
  authItems: AuthConfig[];
  onClose: () => void;
  onSave: (group: GroupConfig) => void;
}

export const GroupEditDrawer: React.FC<GroupEditDrawerProps> = ({ group, authItems, onClose, onSave }) => {
  const [formData, setFormData] = useState<GroupConfig>(group);
  
  const toggleCode = (code: string) => {
    if (formData.codes.includes(code)) {
      setFormData({ ...formData, codes: formData.codes.filter(c => c !== code) });
    } else {
      setFormData({ ...formData, codes: [...formData.codes, code] });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right-10 duration-300">
        <h3 className="text-xl font-bold mb-8">編輯授權群組配置</h3>
        <div className="flex-1 overflow-y-auto space-y-6">
          <div className="space-y-4">
            <AdminInput label="群組名稱" value={formData.name} onChange={v => setFormData({ ...formData, name: v })} placeholder="e.g. Worky 完整授權套件" />
            <AdminInput label="模組分類" value={formData.module} onChange={v => setFormData({ ...formData, module: v })} placeholder="e.g. 招募平台" />
          </div>
          
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
              <LayoutGrid className="w-3.5 h-3.5 mr-2" /> 選擇包含的功能 (Function Codes)
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {authItems.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => toggleCode(item.code)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${formData.codes.includes(item.code) ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-white border border-gray-100 flex items-center justify-center text-xs font-bold text-blue-600">#{item.bit}</div>
                    <div>
                      <div className="text-sm font-bold text-gray-800">{item.name}</div>
                      <div className="text-[10px] font-mono text-gray-400">{item.code}</div>
                    </div>
                  </div>
                  {formData.codes.includes(item.code) && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 flex space-x-4">
          <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">取消</button>
          <button onClick={() => onSave(formData)} className="flex-1 py-3 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">儲存群組</button>
        </div>
      </div>
    </div>
  );
};
