import React, { useState } from 'react';
import { X, ShieldCheck, Users, Package, Send, AlertCircle, ChevronRight, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Customer, AuthConfig, GroupConfig } from '../../types';
import { EdmModal } from './EdmModal';
import { ChangeConfirmModal } from './ChangeConfirmModal';

interface CustomerDetailModalProps {
  customer: Customer;
  authItems: AuthConfig[];
  groups: GroupConfig[];
  onClose: () => void;
  onUpdate: (updatedCustomer: Customer) => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({ customer, authItems, groups, onClose, onUpdate }) => {
  const [showEdm, setShowEdm] = useState<{ open: boolean; permission?: AuthConfig }>({ open: false });
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<Customer | null>(null);

  const authorizedGroups = groups.filter(g => customer.authorizedGroupIds.includes(g.id));
  
  // Get all unique function codes from authorized groups
  const authorizedCodes = Array.from(new Set(authorizedGroups.flatMap(g => g.codes)));

  const handleToggleGroup = (groupId: string) => {
    const newGroupIds = customer.authorizedGroupIds.includes(groupId)
      ? customer.authorizedGroupIds.filter(id => id !== groupId)
      : [...customer.authorizedGroupIds, groupId];
    
    const updated = { ...customer, authorizedGroupIds: newGroupIds };
    setPendingUpdate(updated);
    setShowConfirm(true);
  };

  const handleConfirmUpdate = (sendLetter: boolean) => {
    if (pendingUpdate) {
      onUpdate(pendingUpdate);
      if (sendLetter) {
        console.log('Sending authorization change letter...');
      }
    }
    setShowConfirm(false);
    setPendingUpdate(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
              <p className="text-xs text-gray-400 font-mono">{customer.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Section: Authorized Groups */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center">
                <Package className="w-4 h-4 mr-2" /> 已開通授權群組 ({authorizedGroups.length})
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map(group => {
                const isAuthorized = customer.authorizedGroupIds.includes(group.id);
                return (
                  <div 
                    key={group.id}
                    className={`p-5 rounded-2xl border-2 transition-all ${isAuthorized ? 'border-blue-500 bg-blue-50/30' : 'border-gray-100 bg-white opacity-60 hover:opacity-100'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="font-bold text-gray-800">{group.name}</h5>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{group.module}</p>
                      </div>
                      <button 
                        onClick={() => handleToggleGroup(group.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${isAuthorized ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        {isAuthorized ? '取消授權' : '立即開通'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.codes.map(code => (
                        <span key={code} className="px-2 py-0.5 bg-white border border-gray-100 text-[9px] font-mono text-gray-500 rounded">
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Permission Stats & EDM */}
          <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center">
              <Users className="w-4 h-4 mr-2" /> 功能授權統計與推廣
            </h4>
            <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">功能名稱 / Code</th>
                    <th className="px-6 py-4">公司狀態</th>
                    <th className="px-6 py-4">個人授權數</th>
                    <th className="px-6 py-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {authItems.map(item => {
                    const isAuthorized = authorizedCodes.includes(item.code);
                    const userCount = customer.permissionStats[item.code] || 0;
                    return (
                      <tr key={item.id} className="hover:bg-white/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-800">{item.name}</div>
                          <div className="text-[10px] font-mono text-gray-400">{item.code}</div>
                        </td>
                        <td className="px-6 py-4">
                          {isAuthorized ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">
                              <ShieldCheck className="w-3 h-3 mr-1" /> 已開通
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 text-gray-500">
                              未開通
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-gray-600 font-bold">
                            <Users className="w-3.5 h-3.5 mr-2 text-gray-300" />
                            {userCount} <span className="text-[10px] font-normal text-gray-400 ml-1">人</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {!isAuthorized && (
                            <button 
                              onClick={() => setShowEdm({ open: true, permission: item })}
                              className="inline-flex items-center px-3 py-1.5 bg-white border border-blue-100 text-blue-600 rounded-xl text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            >
                              <Send className="w-3 h-3 mr-1.5" /> 點擊寄送訂閱 EDM
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button onClick={onClose} className="px-8 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all">
            關閉詳情
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showEdm.open && showEdm.permission && (
          <EdmModal 
            customerName={customer.name}
            permissionName={showEdm.permission.name}
            onClose={() => setShowEdm({ open: false })}
            onSend={(data) => {
              console.log('Sending EDM:', data);
              setShowEdm({ open: false });
            }}
          />
        )}
        {showConfirm && (
          <ChangeConfirmModal 
            onCancel={() => {
              setShowConfirm(false);
              setPendingUpdate(null);
            }}
            onConfirm={handleConfirmUpdate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
