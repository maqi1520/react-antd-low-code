import React from 'react';

import { getLayout } from '../../components/Layout';

export default function Develop() {
  return (
    <div className="container max-w-6xl mx-auto py-4">
      <div className="flex justify-between">
        <div className="text-2xl font-medium text-gray-800">开发</div>
      </div>
      <div>
        安装 docker-compose docker-compose up docker-compose up -d
        后台启动并运行容器 开发中
      </div>
    </div>
  );
}

Develop.getLayout = getLayout;
