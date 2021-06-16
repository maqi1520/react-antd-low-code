import React, { memo, ReactElement, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import cl from 'classnames'
import { useAuth } from '/~/app/PrivateRoute'

interface Props {}

function Header({}: Props): ReactElement {
  const [visible, setVisible] = useState(true)
  const history = useHistory()
  const { loading, user, getUser, signOut } = useAuth()

  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [])

  const handleLogout = () => {
    signOut().then(() => {
      history.replace('/')
    })
  }

  return (
    <header className="h-20 shadow w-full z-50 bg-white sticky top-0 right-0 left-0">
      <div className="container flex items-center justify-center h-full max-w-6xl mx-auto sm:justify-between">
        <Link to="/" className="relative inline-block leading-none">
          <span className="text-3xl">
            <span className="text-pink-500">L</span>
            <span className="text-indigo-600">C</span>
            <span className="text-green-400">G</span>
          </span>
          <span className="text-sm ml-2 text-gray-600">低代码平台</span>
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
          <Link
            to="/project"
            className=" font-bold duration-100   transition-color hover:text-indigo-600"
          >
            应用
          </Link>
          <Link
            to="/component"
            className=" font-bold duration-100   transition-color hover:text-indigo-600"
          >
            组件
          </Link>
          <Link
            to="/develop"
            className=" font-bold duration-100  transition-color hover:text-indigo-600"
          >
            开发
          </Link>
          <Link
            to="/docs"
            className="font-bold duration-100 transition-color hover:text-indigo-600"
          >
            文档
          </Link>

          {loading ? null : user ? (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600 text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className="ml-2 flex items-center text-gray-600 no-underline hover:text-gray-600">
                {user?.email}
              </span>
              <span
                onClick={handleLogout}
                className="ml-2 text-gray-400 hover:text-indigo-600 cursor-pointer"
              >
                退出
              </span>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="w-full px-5 py-2 text-center text-pink-500 border border-gray-200 font-bold md:w-auto hover:text-indigo-600"
              >
                登录
              </Link>
              <Link
                to="/registery"
                className="w-full px-5 py-2  text-center text-white bg-indigo-700 font-bold md:w-auto hover:text-white"
              >
                注册
              </Link>
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
  )
}

export default memo(Header)
