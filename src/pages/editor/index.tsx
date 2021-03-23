import React, { useState } from 'react'
import Left from './components/Left'
import Right from './components/Right'
import Canvas from './components/Canvas'
import CodeBox from './components/CodeBox'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function Editor() {
  const [visible, setVisible] = useState(false)
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col text-gray-600">
        <header className="h-14 px-2 bg-indigo-500 flex-shrink-0 shadow-md flex justify-between items-center">
          <div className="text-white text-3xl">Code generate</div>
          <div>
            <button onClick={() => setVisible(!visible)} className="button">
              show code
            </button>
          </div>
        </header>
        {visible ? (
          <CodeBox />
        ) : (
          <main className="flex-1 overflow-hidden flex">
            <Left />
            <Canvas />
            <Right />
          </main>
        )}
      </div>
    </DndProvider>
  )
}

export default Editor
