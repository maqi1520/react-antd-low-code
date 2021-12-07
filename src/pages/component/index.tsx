import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getLayout } from '../../components/Layout';

interface Props {}

export function Item({}: Props): ReactElement {
  return (
    <div className="border p-4 flex">
      <div className="flex-shrink-0 w-12 h-12 flex justify-center items-center rounded  bg-indigo-600 text-gray-50">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <div className="flex-1 pl-4">
        <div className="text-gray-900 text-xl">测试组件</div>
        <div className="text-gray-400  text-sm">Abc</div>
      </div>
      <div>
        <Link href="/">
          <a className="text-indigo-600">预览</a>
        </Link>
      </div>
    </div>
  );
}

export default function Project(): ReactElement {
  const router = useRouter();

  const handleCreate = () => {
    router.push('/editor');
  };
  return (
    <main className="container max-w-6xl mx-auto py-4">
      <div className="flex justify-between">
        <div className="text-2xl font-medium text-gray-800">我的组件</div>
        <button onClick={handleCreate} className="btn btn-primary">
          创建组件
        </button>
      </div>
      <div className="grid-cols-1 lg:grid-cols-4 gap-4 grid py-4">
        <Item />
        <Item />
      </div>
    </main>
  );
}

Project.getLayout = getLayout;
