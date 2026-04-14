import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { AuthConfig } from '../../types';

interface ConfigTableProps {
  config: AuthConfig[];
  onEdit: (item: AuthConfig) => void;
  onDelete: (id: string) => void;
}

export const ConfigTable: React.FC<ConfigTableProps> = ({ config, onEdit, onDelete }) => (
  <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
        <tr>
          <th className="px-6 py-4">Bit Index</th>
          <th className="px-6 py-4">名稱 / 渠道</th>
          <th className="px-6 py-4">Function Code</th>
          <th className="px-6 py-4">層級設定</th>
          <th className="px-6 py-4 text-right">操作</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {config.map(item => (
          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-6 py-4 font-mono font-bold text-blue-600 bg-blue-50/30">#{item.bit.toString().padStart(3, '0')}</td>
            <td className="px-6 py-4">
              <div className="font-bold text-gray-800">{item.name}</div>
              <div className="text-[10px] text-gray-400">{item.brandChannel} / {item.productChannel}</div>
            </td>
            <td className="px-6 py-4"><code className="text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">{item.code}</code></td>
            <td className="px-6 py-4 space-x-2">
              {item.company && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-bold">公司級</span>}
              {item.personal && <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-bold">個人級</span>}
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex justify-end space-x-1">
                <button onClick={() => onEdit(item)} className="p-2 text-gray-400 hover:text-blue-600 transition-all"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => onDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
