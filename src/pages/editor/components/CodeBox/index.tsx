import React, { useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import { useAppSelector } from '/~/app/hooks'
import { generateCode } from './generateCode'
import MyWorker from './worker?worker'
import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-xcode'

var myWorker = new MyWorker()

export default function CodeBox() {
  const state = useAppSelector((state) => state.codeTree)
  const [code, setCode] = useState('')

  useEffect(() => {
    myWorker.onmessage = function (e) {
      setCode(e.data)
    }
  }, [])

  useEffect(() => {
    const code = generateCode(state)
    myWorker.postMessage(code)
    console.log('Message posted to worker')
  }, [state])
  return (
    <div className="flex-1">
      <AceEditor
        mode="javascript"
        theme="xcode"
        width="100%"
        height="100%"
        onChange={() => {}}
        value={code}
        name="code"
        showPrintMargin={false}
        fontSize={14}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  )
}
