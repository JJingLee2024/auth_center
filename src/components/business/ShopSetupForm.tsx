import React from 'react';
import { X } from 'lucide-react';
import { Input } from '../shared/Input';
import { Select } from '../shared/Select';

export const ShopSetupForm: React.FC = () => (
  <div className="animate-in fade-in slide-in-from-right-4 duration-400">
    <div className="flex items-center space-x-2 mb-6">
      <button className="text-gray-400 hover:text-gray-600">
        <X className="w-5 h-5" onClick={() => window.location.reload()} />
      </button>
      <h2 className="text-xl font-bold">設定店舖資訊</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
      <Input label="店舖名稱" placeholder="例：ABC 咖啡" required />
      <Input label="分店名稱" placeholder="例：信義旗艦店" />
      <Select label="行業別" placeholder="選擇行業別" required />
      <Select label="子類別" placeholder="選擇子類別" required />
      <div className="md:col-span-2">
        <Input label="店舖地址" placeholder="例：台北市信義區松壽路 12 號 B1" required />
      </div>
      <Input label="聯繫電話" placeholder="02-1234-5678" required />
      <Input label="聯繫信箱" placeholder="hire@example.com" required />
    </div>
    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
      <button className="px-6 py-2.5 text-sm font-bold text-gray-500">取消</button>
      <button className="px-8 py-2.5 text-sm font-bold bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed">
        儲存變更並同步
      </button>
    </div>
  </div>
);
