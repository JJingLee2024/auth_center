import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  BusinessView 
} from './types';
import { initialGlobalAuthConfig, initialGroupConfig } from './data/initialData';
import { SettingsTab } from './components/settings/SettingsTab';
import { BusinessFlowTab } from './components/business/BusinessFlowTab';
import { AdminTab } from './components/admin/AdminTab';
import { AuthModal } from './components/shared/AuthModal';
import { RedirectIframeModal } from './components/shared/RedirectIframeModal';
import { ShopSetupForm } from './components/business/ShopSetupForm';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('settings');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [businessView, setBusinessView] = useState<BusinessView>('selection');
  const [triggerSource, setTriggerSource] = useState<string | null>(null);

  // Check if we are in "Iframe Mode" (Redirect Target)
  const [isIframeMode, setIsIframeMode] = useState(false);
  const [iframeJobId, setIframeJobId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'iframe') {
      setIsIframeMode(true);
      setIframeJobId(params.get('jobId'));
    }
  }, []);

  // 1. 全域授權項目 (主表)
  const [globalAuthConfig, setGlobalAuthConfig] = useState(initialGlobalAuthConfig);

  // 2. 前台群組配置 (UI Grouping)
  const [groupConfig, setGroupConfig] = useState(initialGroupConfig);

  const handleToggleOrClick = (source: string) => {
    if (!isAuthorized) {
      setTriggerSource(source);
      setShowAuthModal(true);
    } else {
      if (source === 'business') {
        // If already authorized, we can still trigger the redirect flow for demo
        const mockJobId = 'JOB-' + Math.floor(Math.random() * 10000);
        const url = `${window.location.origin}${window.location.pathname}?mode=iframe&jobId=${mockJobId}&token=auth_token_xyz_123`;
        setRedirectUrl(url);
        setShowRedirectModal(true);
      }
    }
  };

  const handleAuthorize = () => {
    setIsAuthorized(true);
    setShowAuthModal(false);
    
    if (triggerSource === 'business') {
      // Construct redirect URL with login state (token) and default Job ID
      const mockJobId = 'JOB-88291';
      const url = `${window.location.origin}${window.location.pathname}?mode=iframe&jobId=${mockJobId}&token=auth_token_xyz_123`;
      setRedirectUrl(url);
      setShowRedirectModal(true);
    }
  };

  const resetAll = () => {
    setIsAuthorized(false);
    setBusinessView('selection');
    setIsExpanded(false);
    setShowRedirectModal(false);
  };

  // If in Iframe Mode, only render the Shop Setup Form
  if (isIframeMode) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-bold text-blue-700">正在編輯職缺: {iframeJobId}</span>
            </div>
            <span className="text-[10px] font-mono text-blue-400">SESSION_ACTIVE: TRUE</span>
          </div>
          <ShopSetupForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[850px]">
        
        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-100 px-6 pt-4 bg-white sticky top-0 z-20">
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            設定頁面 {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('business')} 
            className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'business' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            業務流程觸發 {activeTab === 'business' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('admin')} 
            className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'admin' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            授權後台管理 {activeTab === 'admin' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
          </button>
          <button onClick={resetAll} className="ml-auto pb-3 text-xs text-gray-400 hover:text-red-500 underline">重置狀態</button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'settings' && (
            <SettingsTab 
              isAuthorized={isAuthorized} 
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              onToggle={() => handleToggleOrClick('settings')}
              group={groupConfig[0]} 
              authItems={globalAuthConfig}
            />
          )}
          {activeTab === 'business' && (
            <BusinessFlowTab 
              view={businessView} 
              isAuthorized={isAuthorized} 
              onChannelClick={() => handleToggleOrClick('business')} 
            />
          )}
          {activeTab === 'admin' && (
            <AdminTab 
              config={globalAuthConfig} 
              setConfig={setGlobalAuthConfig} 
              groups={groupConfig} 
              setGroups={setGroupConfig} 
            />
          )}
        </div>
      </div>

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onConfirm={handleAuthorize} 
        />
      )}

      {showRedirectModal && (
        <RedirectIframeModal 
          url={redirectUrl} 
          onClose={() => setShowRedirectModal(false)} 
        />
      )}
    </div>
  );
};

export default App;
