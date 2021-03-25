import React, { memo } from 'react'
import { Progress } from 'antd'
import logo from '/~/assets/progress.png'

export interface IXProgressConfig {
  status: 'success' | 'exception' | 'normal' | 'active'
  type: 'line' | 'circle' | 'dashboard'
  percent: number
  strokeWidth: number
}

const XProgress = memo((props: IXProgressConfig & { isTpl: boolean }) => {
  const { status, type, percent, strokeWidth, isTpl } = props
  return (
    <>
      {isTpl ? (
        <div>
          <img src={logo} alt=""></img>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Progress
            type={type}
            percent={percent}
            status={status}
            strokeWidth={strokeWidth}
          />
        </div>
      )}
    </>
  )
})

export default XProgress
