export interface AuthData {
  field: string;
  required: boolean;
}

export interface AuthConfig {
  id: string;
  bit: number;
  brandChannel: string;
  productChannel: string;
  module: string;
  code: string;
  name: string;
  company: boolean;
  personal: boolean;
  companyAuthDatas: AuthData[];
  personalAuthDatas: AuthData[];
}

export interface GroupConfig {
  id: string;
  module: string;
  codes: string[];
  name: string;
}

export interface Customer {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Inactive';
  authorizedGroupIds: string[];
  permissionStats: { [code: string]: number }; // code -> user count
  effectiveAuthFlag: string;
}

export type AdminView = 'config' | 'customer' | 'groups';
export type BusinessView = 'selection' | 'setup';
export type ActiveTab = 'settings' | 'business' | 'admin';
