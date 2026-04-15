import React, { useState, useMemo } from 'react';
import { LayoutGrid, Package, CheckCircle2, X, Smile } from 'lucide-react';
import { motion } from 'motion/react';
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
  
  // Get unique brand channels
  const brandChannels = useMemo(() => Array.from(new Set(authItems.map(i => i.brandChannel))), [authItems]);
  
  // Get product channels for selected brand
  const productChannels = useMemo(() => {
    if (!formData.brandChannel) return [];
    return Array.from(new Set(authItems.filter(i => i.brandChannel === formData.brandChannel).map(i => i.productChannel)));
  }, [authItems, formData.brandChannel]);

  // Filter auth items based on selected product channel
  const filteredAuthItems = useMemo(() => {
    if (!formData.productChannel) return [];
    return authItems.filter(i => i.productChannel === formData.productChannel);
  }, [authItems, formData.productChannel]);

  const toggleCode = (code: string) => {
    if (formData.codes.includes(code)) {
      setFormData({ ...formData, codes: formData.codes.filter(c => c !== code) });
    } else {
      setFormData({ ...formData, codes: [...formData.codes, code] });
    }
  };

  const handleBrandChange = (brand: string) => {
    setFormData({ 
      ...formData, 
      brandChannel: brand, 
      productChannel: '', 
      codes: [] 
    });
  };

  const handleProductChange = (product: string) => {
    setFormData({ 
      ...formData, 
      productChannel: product, 
      codes: [] 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <h3 className="text-xl font-bold text-gray-900">編輯授權群組配置</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Basic Info */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-600">
              <Smile className="w-4 h-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider">基本資訊</h4>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <AdminInput label="群組名稱" value={formData.name} onChange={v => setFormData({ ...formData, name: v })} placeholder="e.g. Worky 完整授權套件" />
              </div>
              <div className="w-24">
                <AdminInput label="Icon" value={formData.icon || ''} onChange={v => setFormData({ ...formData, icon: v })} placeholder="😊" />
              </div>
            </div>
            <AdminInput label="模組分類 (選填)" value={formData.module || ''} onChange={v => setFormData({ ...formData, module: v })} placeholder="e.g. 招募平台" />
          </section>

          {/* Channel Selection */}
          <section className="space-y-6 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-purple-600">
              <Package className="w-4 h-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider">頻道設定</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">品牌頻道 (Brand)</label>
                <select 
                  value={formData.brandChannel}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  <option value="">請選擇品牌...</option>
                  {brandChannels.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">產品頻道 (Product)</label>
                <select 
                  disabled={!formData.brandChannel}
                  value={formData.productChannel}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-50"
                >
                  <option value="">請選擇產品...</option>
                  {productChannels.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </section>
          
          {/* Codes Selection */}
          <section className="space-y-6 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-green-600">
              <LayoutGrid className="w-4 h-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider">功能細項 (Function Codes)</h4>
            </div>
            
            {!formData.productChannel ? (
              <div className="p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-400">請先選擇產品頻道以載入可用功能</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredAuthItems.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => toggleCode(item.code)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${formData.codes.includes(item.code) ? 'border-blue-500 bg-blue-50/30' : 'border-gray-100 bg-white hover:border-blue-100'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[10px] font-bold text-blue-600 shadow-sm">#{item.bit}</div>
                      <div>
                        <div className="text-sm font-bold text-gray-800">{item.name}</div>
                        <div className="text-[10px] font-mono text-gray-400">{item.code}</div>
                      </div>
                    </div>
                    {formData.codes.includes(item.code) && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex space-x-4">
          <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-500 hover:bg-white hover:shadow-sm rounded-xl transition-all">取消</button>
          <button 
            disabled={!formData.name || !formData.productChannel || formData.codes.length === 0}
            onClick={() => onSave(formData)} 
            className="flex-1 py-3 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all disabled:opacity-50 disabled:shadow-none"
          >
            儲存群組配置
          </button>
        </div>
      </motion.div>
    </div>
  );
};
