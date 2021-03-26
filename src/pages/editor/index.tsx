import React, { useState } from 'react'
import { Switch } from 'antd'
import Left from './components/Left'
import Right from './components/Right'
import Canvas from './components/Canvas'
import CodeBox from './components/CodeBox'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function Editor() {
  const [visible, setVisible] = useState(false)
  const [checked, setChecked] = useState(false)
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col text-gray-600">
        <header className="h-14 px-2 shadow-sm sticky border-b border-gray-200 flex-shrink-0  flex justify-between items-center">
          <div className="text-indigo-600 text-3xl">Low Code Generator</div>
          <div className="inline-flex justify-center items-center">
            <div className="inline-flex justify-center items-center">
              <svg
                className="w-6 h-6 text-gray-500 mr-1"
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
                className="w-6 h-6 text-gray-500"
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
            <button onClick={() => setVisible(!visible)} className="btn ml-2">
              show code
            </button>
            <button className="btn btn-primary ml-2">save</button>
          </div>
        </header>
        {visible ? (
          <CodeBox />
        ) : (
          <main className="flex-1 overflow-hidden flex">
            <Left />
            <Canvas mobile={checked} />
            <Right />
          </main>
        )}
      </div>
    </DndProvider>
  )
}

export default Editor
