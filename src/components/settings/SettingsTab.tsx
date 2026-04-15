import React from 'react';
import { Lock, ChevronDown, CheckCircle2, Package } from 'lucide-react';
import { AuthConfig, GroupConfig } from '../../types';

interface SettingsTabProps {
  isAuthorized: boolean;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  onToggle: () => void;
  group: GroupConfig;
  authItems: AuthConfig[];
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ 
  isAuthorized, 
  isExpanded, 
  setIsExpanded, 
  onToggle, 
  group, 
  authItems 
}) => {
  // 模擬從群組配置中過濾出對應的細項
  const groupItems = authItems.filter(item => group.codes.includes(item.code));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">合作方授權</h2>
          <p className="text-sm text-gray-500 mt-1">管理您的 Apollo 合作方授權 配置</p>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          <Lock className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500 font-medium">加密連線中</span>
        </div>
      </div>

      <div className="mb-4">
        <span className="text-sm text-gray-500">1 個通路已連線 · </span>
        <span className="text-sm text-red-500 font-medium italic">1 個憑證已失效，需重新授權</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white border border-gray-100 rounded-xl flex items-center justify-center p-2 shadow-inner text-2xl">
              {group.icon || '😊'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-gray-800">{group.name}</h3>
                {group.module && (
                  <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold uppercase tracking-wider">
                    {group.module}
                  </span>
                )}
                {isAuthorized && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" /> 已連線
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {group.brandChannel} · {group.productChannel}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onToggle} 
              className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAuthorized ? 'bg-blue-500' : 'bg-gray-200'}`}
            >
              <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAuthorized ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-gray-400 hover:bg-gray-50 p-1 rounded-full transition-transform" 
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="px-5 pb-6 pt-2 border-t border-gray-50 bg-gray-50/50 animate-in slide-in-from-top-2 duration-200">
            <div className="mb-4 flex items-center space-x-2 text-xs text-blue-500 bg-blue-50 w-fit px-2 py-1 rounded">
              <Package className="w-3 h-3" />
              <span>此項目已透過「{group.name}」群組進行一次性授權</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">公司層級功能</h4>
                <ul className="space-y-2">
                  {groupItems.filter(i => i.company).map(item => (
                    <li key={item.id} className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> {item.name} ({item.code})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">個人層級功能</h4>
                <ul className="space-y-2">
                  {groupItems.filter(i => i.personal).map(item => (
                    <li key={item.id} className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> {item.name} ({item.code})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
