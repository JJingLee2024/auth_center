import React, { useState } from 'react';
import { Info, Plus, Layers, Package } from 'lucide-react';
import { AuthConfig, GroupConfig, AdminView } from '../../types';
import { ConfigTable } from './ConfigTable';
import { AdminEditDrawer } from './AdminEditDrawer';
import { GroupEditDrawer } from './GroupEditDrawer';
import { CustomerView } from './CustomerView';

interface AdminTabProps {
  config: AuthConfig[];
  setConfig: React.Dispatch<React.SetStateAction<AuthConfig[]>>;
  groups: GroupConfig[];
  setGroups: React.Dispatch<React.SetStateAction<GroupConfig[]>>;
}

export const AdminTab: React.FC<AdminTabProps> = ({ config, setConfig, groups, setGroups }) => {
  const [adminView, setAdminView] = useState<AdminView>('config');
  const [editingItem, setEditingItem] = useState<AuthConfig | null>(null);
  const [editingGroup, setEditingGroup] = useState<GroupConfig | null>(null);

  return (
    <div className="animate-in fade-in slide-in-from-right-2 duration-300 relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">授權中心後台</h2>
          <p className="text-sm text-gray-500">管理全域授權索引、授權群組與客戶權限</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {(['config', 'groups', 'customer'] as AdminView[]).map(view => (
            <button 
              key={view} 
              onClick={() => setAdminView(view)} 
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${adminView === view ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
            >
              {view === 'config' ? '授權配置' : view === 'groups' ? '群組配置' : '客戶管理'}
            </button>
          ))}
        </div>
      </div>

      {adminView === 'config' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-blue-700">
              <Info className="w-4 h-4" />
              <span className="text-sm font-medium">目前佔用 {config.length} 個位元索引。支援最大 1024 個項目映射。</span>
            </div>
            <button 
              onClick={() => setEditingItem({ 
                id: 'new', 
                bit: config.length, 
                brandChannel: '', 
                productChannel: '', 
                module: '', 
                code: '', 
                name: '', 
                company: true, 
                personal: true,
                companyAuthDatas: [],
                personalAuthDatas: []
              })} 
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> 新增授權項目
            </button>
          </div>
          <ConfigTable 
            config={config} 
            onEdit={setEditingItem} 
            onDelete={id => setConfig(config.filter(c => c.id !== id))} 
          />
        </div>
      )}

      {adminView === 'groups' && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-purple-700">
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">前台 UI 群組配置：可將多個 Function Code 打包為一次性授權單位。</span>
            </div>
            <button 
              onClick={() => setEditingGroup({ 
                id: 'new', 
                name: '', 
                brandChannel: '', 
                productChannel: '', 
                module: '', 
                icon: '😊', 
                codes: [] 
              })} 
              className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-700 flex items-center"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> 建立授權群組
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {groups.map(group => (
              <div key={group.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl">
                      {group.icon || <Package className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-gray-900">{group.name}</h4>
                        {group.module && (
                          <span className="px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-[9px] font-bold uppercase tracking-wider">
                            {group.module}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {group.brandChannel} · {group.productChannel}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => setEditingGroup(group)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setGroups(groups.filter(g => g.id !== group.id))} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.codes.map(code => (
                    <span key={code} className="px-2 py-1 bg-slate-50 text-slate-500 rounded text-[10px] font-mono border border-slate-100">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminView === 'customer' && (
        <CustomerView 
          authItems={config}
          groups={groups}
        />
      )}

      {editingItem && (
        <AdminEditDrawer 
          item={editingItem} 
          onClose={() => setEditingItem(null)} 
          onSave={(newItem) => {
            if (newItem.id === 'new') setConfig([...config, { ...newItem, id: `auth${Date.now()}` }]);
            else setConfig(config.map(c => c.id === newItem.id ? newItem : c));
            setEditingItem(null);
          }} 
        />
      )}

      {editingGroup && (
        <GroupEditDrawer 
          group={editingGroup} 
          authItems={config} 
          onClose={() => setEditingGroup(null)} 
          onSave={(newGroup) => {
            if (newGroup.id === 'new') setGroups([...groups, { ...newGroup, id: `group${Date.now()}` }]);
            else setGroups(groups.map(g => g.id === newGroup.id ? newGroup : g));
            setEditingGroup(null);
          }} 
        />
      )}
    </div>
  );
};

// Internal components used in AdminTab
const Edit2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
);

const Trash2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);
