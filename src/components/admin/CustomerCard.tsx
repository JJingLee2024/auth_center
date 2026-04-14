import React from 'react';
import { Building2, Terminal, ShieldCheck, ChevronRight } from 'lucide-react';
import { Customer } from '../../types';

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all group cursor-pointer"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{customer.name}</h4>
          <p className="text-[10px] text-gray-400">{customer.id}</p>
        </div>
      </div>
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {customer.status}
      </span>
    </div>
    <div className="space-y-3">
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Effective Auth Flag (Hex)</span>
          <Terminal className="w-3 h-3 text-gray-300" />
        </div>
        <code className="text-xs text-blue-600 font-mono font-bold">{customer.effectiveAuthFlag}</code>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold flex items-center border border-blue-100">
          <ShieldCheck className="w-3 h-3 mr-1" /> 已開通 {customer.authorizedGroupIds.length} 個群組
        </span>
      </div>
    </div>
    <button className="w-full mt-4 py-2 border border-gray-100 rounded-xl text-xs font-bold text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all flex items-center justify-center">
      查看授權詳情 <ChevronRight className="w-3.5 h-3.5 ml-1" />
    </button>
  </div>
);
