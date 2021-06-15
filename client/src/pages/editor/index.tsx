import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { message, Switch } from 'antd'
import cl from 'classnames'
import Left from './components/Left'
import Right from './components/Right'
import Canvas from './components/Canvas'
import ShowCodeBtn from './components/ShowCodeBtn'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { useAppStore } from '/~/app/hooks'
import axios from 'axios'

function Editor() {
  const [checked, setChecked] = useState(false)
  const store = useAppStore()
  const state = store.getState()
  const handleSave = async () => {
    const res = await axios.post('/api/component', {
      ...state.component,
      data: JSON.stringify(state.codeTree),
    })
    if (res.data) {
      message.success('保存成功！')
    }
    //saveComponent()
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col text-gray-600">
        <header className="h-14 px-2 shadow-sm sticky border-b border-gray-200 flex-shrink-0  flex justify-between items-center">
          <Link to="/">
            <span className="text-3xl">
              <span className="text-red-500">L</span>
              <span className="text-indigo-600">C</span>
              <span className="text-green-400">G</span>
            </span>
            <span className="text-sm ml-2 text-gray-600">低代码平台</span>
          </Link>

          <div className="inline-flex justify-center items-center">
            <div className="inline-flex justify-center items-center">
              <svg
                className={cl('w-6 h-6 mr-1', {
                  'text-indigo-600': !checked,
                  'text-gray-500': checked,
                })}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <Switch checked={checked} onChange={(c) => setChecked(c)} />
              <svg
                className={cl('w-6 h-6 ml-1', {
                  'text-indigo-600': checked,
                  'text-gray-500': !checked,
                })}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <ShowCodeBtn />
            <button onClick={handleSave} className="btn btn-primary ml-2">
              save
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-hidden flex">
          <Left />
          <Canvas mobile={checked} />
          <Right />
        </main>
      </div>
    </DndProvider>
  )
}

export default Editor
