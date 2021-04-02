import React, { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import cl from 'classnames'

interface Props {}

export default function Header({}: Props): ReactElement {
  const [visible, setVisible] = useState(true)
  return (
    <header className="relative z-50 w-full h-24">
      <div className="container flex items-center justify-center h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0">
        <Link to="/" className="relative inline-block h-5  leading-none">
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
            'absolute top-0 left-0 z-50 flex flex-col items-center justify-between  w-full h-64 p-5 mt-24 text-sm text-gray-800 bg-gray-50 border-t border-b border-gray-200 shadow-sm md:w-auto md:flex-row md:h-24  md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative md:space-x-5 md:shadow-none',
            {
              hidden: visible,
            }
          )}
        >
          <Link
            to="/template"
            className="font-bold duration-100  transition-color hover:text-indigo-600"
          >
            模板
          </Link>
          <Link
            to="/app"
            className=" font-bold duration-100   transition-color hover:text-indigo-600"
          >
            应用
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

          <Link
            to="/login"
            className="w-full px-5 py-2 text-center text-pink-500 border border-gray-200 font-bold md:w-auto"
          >
            登录
          </Link>
          <Link
            to="/registery"
            className="w-full px-5 py-2  text-center text-white bg-indigo-700 font-bold md:w-auto"
          >
            注册
          </Link>
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
