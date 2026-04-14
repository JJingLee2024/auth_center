import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { CustomerCard } from './CustomerCard';
import { CustomerDetailModal } from './CustomerDetailModal';
import { Customer, AuthConfig, GroupConfig } from '../../types';
import { initialCustomers } from '../../data/initialData';
import { AnimatePresence } from 'motion/react';

interface CustomerViewProps {
  authItems: AuthConfig[];
  groups: GroupConfig[];
}

export const CustomerView: React.FC<CustomerViewProps> = ({ authItems, groups }) => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpdateCustomer = (updated: Customer) => {
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelectedCustomer(updated);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="搜尋公司名稱或 ID..." 
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none" 
          />
        </div>
        <button className="bg-white border border-gray-200 p-2 rounded-xl text-gray-400 hover:text-gray-600 transition-all shadow-sm">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredCustomers.map(customer => (
          <CustomerCard 
            key={customer.id} 
            customer={customer} 
            onClick={() => setSelectedCustomer(customer)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedCustomer && (
          <CustomerDetailModal 
            customer={selectedCustomer}
            authItems={authItems}
            groups={groups}
            onClose={() => setSelectedCustomer(null)}
            onUpdate={handleUpdateCustomer}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
