import { AuthConfig, GroupConfig, Customer } from '../types';

export const initialCustomers: Customer[] = [
  {
    id: 'ABC-GROUP-99',
    name: 'ABC 咖啡集團',
    status: 'Active',
    authorizedGroupIds: ['group001'],
    permissionStats: {
      'worky-postjob': 12,
      'worky-sync-data': 2,
      'worky-read-app': 45,
      '104-post': 5
    },
    effectiveAuthFlag: '0x0000...000F'
  },
  {
    id: 'LOTUS-B-12',
    name: '露特莎烘焙',
    status: 'Pending',
    authorizedGroupIds: [],
    permissionStats: {
      'worky-postjob': 0,
      'worky-sync-data': 0,
      'worky-read-app': 0,
      '104-post': 0
    },
    effectiveAuthFlag: '0x0000...0000'
  }
];

export const initialGlobalAuthConfig: AuthConfig[] = [
  { 
    id: 'auth001', bit: 0, brandChannel: 'Worky.com', productChannel: 'Worky', module: '招募平台', 
    code: 'worky-postjob', name: '職缺上架', company: true, personal: true,
    companyAuthDatas: [{ field: 'company_name', required: true }],
    personalAuthDatas: [{ field: 'user_email', required: true }]
  },
  { 
    id: 'auth002', bit: 1, brandChannel: 'Worky.com', productChannel: 'Worky', module: '招募平台', 
    code: 'worky-sync-data', name: '數據同步', company: true, personal: false,
    companyAuthDatas: [{ field: 'sync_token', required: true }],
    personalAuthDatas: []
  },
  { 
    id: 'auth003', bit: 2, brandChannel: 'Worky.com', productChannel: 'Worky', module: '招募平台', 
    code: 'worky-read-app', name: '應徵讀取', company: false, personal: true,
    companyAuthDatas: [],
    personalAuthDatas: [{ field: 'resume_access', required: true }]
  },
  { 
    id: 'auth004', bit: 3, brandChannel: '104.com.tw', productChannel: '104', module: '招募平台', 
    code: '104-post', name: '104發佈', company: true, personal: false,
    companyAuthDatas: [{ field: 'api_key', required: true }],
    personalAuthDatas: []
  },
];

export const initialGroupConfig: GroupConfig[] = [
  { id: 'group001', module: '招募平台-Worky', codes: ['worky-postjob', 'worky-sync-data', 'worky-read-app'], name: 'Worky 完整授權套件' }
];
