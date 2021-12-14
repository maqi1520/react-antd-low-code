import React from 'react';
import { getLayout } from '../../components/Layout';

export default function Docs() {
  return (
    <div className="container max-w-6xl mx-auto py-4">
      <div className="flex justify-between">
        <div className="text-2xl font-medium text-gray-800">文档</div>
      </div>
      <div>开发中</div>
    </div>
  );
}

Docs.getLayout = getLayout;
