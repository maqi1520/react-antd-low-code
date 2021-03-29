import React, { useState, useEffect } from 'react'
import { message, Modal } from 'antd'
import AceEditor from 'react-ace'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useAppSelector } from '/~/app/hooks'
import { generateCode } from './generateCode'
import MyWorker from './worker?worker'
import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-xcode'

var myWorker = new MyWorker()

export default function CodeBox() {
  const state = useAppSelector((state) => state.codeTree)
  const [visible, setVisible] = useState(false)
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
    <>
      <button onClick={() => setVisible(!visible)} className="btn ml-2">
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
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        <span className="ml-1">show code</span>
      </button>
      <Modal
        width="800px"
        onCancel={() => setVisible(false)}
        title="代码预览"
        footer={false}
        visible={visible}
      >
        <AceEditor
          mode="javascript"
          theme="xcode"
          width="100%"
          height="560px"
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
        <div className="flex justify-center border-t border-gray-200 pt-5">
          <CopyToClipboard
            text={code}
            onCopy={() => message.success('复制成功')}
          >
            <button className="btn mr-5">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
              复制
            </button>
          </CopyToClipboard>
          <button className="btn btn-primary">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            下载
          </button>
        </div>
      </Modal>
    </>
  )
}
