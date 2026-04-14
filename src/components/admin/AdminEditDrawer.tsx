import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Plus, Trash2, Check, ChevronDown, Search, X } from 'lucide-react';
import { AuthConfig, AuthData } from '../../types';
import { AdminInput } from './AdminInput';
import { motion, AnimatePresence } from 'motion/react';

interface AdminEditDrawerProps {
  item: AuthConfig;
  onClose: () => void;
  onSave: (item: AuthConfig) => void;
}

const HRM_COMPANY_FIELDS = ['company_name', 'tax_id', 'company_address', 'company_phone', 'legal_representative', 'industry_type', 'company_email'];
const HRM_PERSONAL_FIELDS = ['user_name', 'user_email', 'user_phone', 'employee_id', 'department', 'position', 'birth_date', 'gender', 'avatar_url'];

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\.]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export const AdminEditDrawer: React.FC<AdminEditDrawerProps> = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState<AuthConfig>(item);
  const [isAutoCode, setIsAutoCode] = useState(item.id === 'new');

  useEffect(() => {
    if (isAutoCode) {
      const newCode = [formData.brandChannel, formData.productChannel, formData.name]
        .filter(Boolean)
        .map(slugify)
        .join('-');
      setFormData(prev => ({ ...prev, code: newCode }));
    }
  }, [formData.brandChannel, formData.productChannel, formData.name, isAutoCode]);

  const handleSave = () => {
    const finalData = { ...formData };
    if (finalData.id === 'new') {
      finalData.id = `auth_${Date.now()}`;
    }
    onSave(finalData);
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
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {item.id === 'new' ? '新增授權配置' : '編輯授權配置'}
            </h3>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              {formData.id === 'new' ? 'NEW_RECORD' : formData.id}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 pb-40">
          {/* Basic Info Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-600">
              <Terminal className="w-4 h-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider">基本配置</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminInput 
                label="品牌渠道 (Brand)" 
                value={formData.brandChannel} 
                onChange={v => setFormData({ ...formData, brandChannel: v })} 
                placeholder="e.g. Worky.com" 
              />
              <AdminInput 
                label="產品渠道 (Product)" 
                value={formData.productChannel} 
                onChange={v => setFormData({ ...formData, productChannel: v })} 
                placeholder="e.g. Worky" 
              />
            </div>

            <AdminInput 
              label="授權項目名稱" 
              value={formData.name} 
              onChange={v => setFormData({ ...formData, name: v })} 
              placeholder="e.g. 職缺上架" 
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Function Code</label>
                <button 
                  onClick={() => setIsAutoCode(!isAutoCode)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${isAutoCode ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}
                >
                  {isAutoCode ? '自動產生中' : '手動編輯模式'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-300"><Code className="w-4 h-4" /></div>
                <input 
                  type="text" 
                  value={formData.code} 
                  onChange={e => {
                    setFormData({ ...formData, code: e.target.value });
                    setIsAutoCode(false);
                  }} 
                  placeholder="e.g. worky-post-job" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none font-mono" 
                />
              </div>
            </div>
          </section>

          {/* Auth Level Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 text-purple-600">
              <Check className="w-4 h-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider">授權層級與資料屬性</h4>
            </div>

            <div className="space-y-4">
              {/* Company Level */}
              <div className="border border-gray-100 rounded-2xl">
                <label className="flex items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors rounded-t-2xl">
                  <input 
                    type="checkbox" 
                    checked={formData.company} 
                    onChange={e => setFormData({ ...formData, company: e.target.checked })} 
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="ml-3 font-bold text-gray-700">啟用公司層級授權</span>
                </label>
                <AnimatePresence>
                  {formData.company && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-white rounded-b-2xl"
                    >
                      <div className="p-4 border-t border-gray-100">
                        <AuthDataList 
                          data={formData.companyAuthDatas} 
                          options={HRM_COMPANY_FIELDS}
                          onChange={newData => setFormData({ ...formData, companyAuthDatas: newData })}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Personal Level */}
              <div className="border border-gray-100 rounded-2xl">
                <label className="flex items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors rounded-t-2xl">
                  <input 
                    type="checkbox" 
                    checked={formData.personal} 
                    onChange={e => setFormData({ ...formData, personal: e.target.checked })} 
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="ml-3 font-bold text-gray-700">啟用個人層級授權</span>
                </label>
                <AnimatePresence>
                  {formData.personal && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-white rounded-b-2xl"
                    >
                      <div className="p-4 border-t border-gray-100">
                        <AuthDataList 
                          data={formData.personalAuthDatas} 
                          options={HRM_PERSONAL_FIELDS}
                          onChange={newData => setFormData({ ...formData, personalAuthDatas: newData })}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex space-x-4">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 font-bold text-gray-500 hover:bg-white hover:shadow-sm rounded-xl transition-all"
          >
            取消
          </button>
          <button 
            onClick={handleSave} 
            className="flex-1 py-3 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
          >
            儲存授權配置
          </button>
        </div>
      </motion.div>
    </div>
  );
};

interface AuthDataListProps {
  data: AuthData[];
  options: string[];
  onChange: (newData: AuthData[]) => void;
}

const AuthDataList: React.FC<AuthDataListProps> = ({ data, options, onChange }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const addItem = () => {
    onChange([...data, { field: '', required: true }]);
  };

  const removeItem = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updates: Partial<AuthData>) => {
    onChange(data.map((item, i) => i === index ? { ...item, ...updates } : item));
  };

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div 
          key={index} 
          className={`flex items-center space-x-3 group transition-all ${activeIndex === index ? 'relative z-30' : 'relative z-0'}`}
        >
          <div className="flex-1">
            <SearchableDropdown 
              value={item.field} 
              options={options} 
              onChange={val => updateItem(index, { field: val })} 
              onOpenChange={(open) => setActiveIndex(open ? index : null)}
            />
          </div>
          <label className="flex items-center space-x-2 cursor-pointer whitespace-nowrap">
            <input 
              type="checkbox" 
              checked={item.required} 
              onChange={e => updateItem(index, { required: e.target.checked })}
              className="w-4 h-4 rounded text-blue-600"
            />
            <span className="text-xs font-medium text-gray-500">必填</span>
          </label>
          <button 
            onClick={() => removeItem(index)}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button 
        onClick={addItem}
        className="w-full py-2 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-center text-xs font-bold"
      >
        <Plus className="w-4 h-4 mr-1" /> 新增資料欄位
      </button>
    </div>
  );
};

interface SearchableDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ value, options, onChange, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && search) {
      handleSelect(search);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border rounded-xl px-4 py-2 text-sm flex items-center justify-between cursor-pointer transition-all ${isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200 hover:border-blue-200'}`}
      >
        <span className={value ? 'text-gray-800 font-medium' : 'text-gray-400'}>
          {value || '選擇或輸入欄位名稱...'}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-2 border-b border-gray-50 flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-300" />
              <input 
                autoFocus
                type="text" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="搜尋或直接輸入..."
                className="flex-1 bg-transparent border-none outline-none text-sm py-1"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.map(opt => (
                <div 
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer flex items-center justify-between"
                >
                  {opt}
                  {opt === value && <Check className="w-4 h-4 text-blue-500" />}
                </div>
              ))}
              {search && !options.includes(search) && (
                <div 
                  onClick={() => handleSelect(search)}
                  className="px-4 py-2 text-sm text-blue-600 bg-blue-50 font-bold cursor-pointer"
                >
                  使用自定義: "{search}"
                </div>
              )}
              {filteredOptions.length === 0 && !search && (
                <div className="px-4 py-8 text-center text-xs text-gray-400">
                  沒有匹配的選項
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
