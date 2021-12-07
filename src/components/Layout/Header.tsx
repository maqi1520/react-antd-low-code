import React, { memo, ReactElement, useState } from 'react';
import Link from 'next/link';
import cl from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';

interface Props {}

function Header({}: Props): ReactElement {
  const [visible, setVisible] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <header className="h-20 shadow w-full z-50 bg-white sticky top-0 right-0 left-0">
      <div className="container flex items-center justify-center h-full max-w-6xl mx-auto sm:justify-between">
        <Link href="/">
          <a className="relative inline-block leading-none">
            <span className="text-3xl">
              <span className="text-pink-500">L</span>
              <span className="text-indigo-600">C</span>
              <span className="text-green-400">G</span>
            </span>
            <span className="text-sm ml-2 text-gray-600">低代码平台</span>
          </a>
        </Link>

        <nav
          id="nav"
          className={cl(
            'absolute top-0 left-0 z-50 flex flex-col items-center justify-between  w-full p-5 mt-20 text-sm text-gray-800 bg-gray-50 border-t border-b border-gray-200 shadow-sm md:p-0 md:w-auto md:flex-row md:h-20  md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative md:space-x-5 md:shadow-none',
            {
              hidden: visible,
            }
          )}
        >
          <Link href="/project">
            <a className=" font-bold duration-100   transition-color hover:text-indigo-600">
              应用
            </a>
          </Link>
          <Link href="/component">
            <a className=" font-bold duration-100   transition-color hover:text-indigo-600">
              组件
            </a>
          </Link>
          <Link href="/develop">
            <a className=" font-bold duration-100  transition-color hover:text-indigo-600">
              开发
            </a>
          </Link>
          <Link href="/docs">
            <a className="font-bold duration-100 transition-color hover:text-indigo-600">
              文档
            </a>
          </Link>

          {!session && (
            <>
              <a
                href={`/api/auth/signin`}
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                登录
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                />
              )}
              <span>
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className="btn btn-small"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                退出
              </a>
            </>
          )}
          <a
            className="flex items-center text-gray-400 no-underline hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/maqi1520/react-antd-low-code"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
          </a>
        </nav>

        <div
          id="nav-mobile-btn"
          onClick={() => setVisible(!visible)}
          className="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none md:hidden sm:mt-10"
        >
          <span className="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1"></span>
          <span className="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full"></span>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
