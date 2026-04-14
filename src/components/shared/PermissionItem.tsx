import React from 'react';

interface PermissionItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const PermissionItem: React.FC<PermissionItemProps> = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-4">
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="text-sm font-bold text-gray-800">{title}</h4>
      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
    </div>
  </div>
);
