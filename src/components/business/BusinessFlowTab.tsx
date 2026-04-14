import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ChannelCard } from './ChannelCard';
import { ShopSetupForm } from './ShopSetupForm';
import { BusinessView } from '../../types';

interface BusinessFlowTabProps {
  view: BusinessView;
  isAuthorized: boolean;
  onChannelClick: () => void;
}

export const BusinessFlowTab: React.FC<BusinessFlowTabProps> = ({ view, isAuthorized, onChannelClick }) => {
  if (view === 'setup') return <ShopSetupForm />;
  
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-900">選擇發佈通路</h2>
        <div className="text-xs font-mono text-gray-300">PHASE 2 · CHANNEL SYNC HUB</div>
      </div>
      <p className="text-sm text-gray-500 mb-8">勾選通路後，未就緒的通路需完成設定才能計入發佈</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ChannelCard title="Apollo 直招" desc="直接刊登於 Apollo 招聘平台" status="ready" icon="A" />
        <ChannelCard 
          title="Worky" 
          desc="同步上架至 Worky 兼職求職平台" 
          status={isAuthorized ? 'ready' : 'auth'} 
          icon="😊" 
          onClick={onChannelClick} 
        />
        <ChannelCard title="104 人力銀行" desc="發佈至台灣最大人力銀行" status="incomplete" icon="104" />
        <ChannelCard title="Facebook Jobs" desc="透過 Facebook 觸及更多求職者" status="auth" icon="f" />
      </div>
      <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-100">
        <CheckCircle2 className="w-5 h-5" />
        <span>確認發佈至 1 個通路</span>
      </button>
    </div>
  );
};
