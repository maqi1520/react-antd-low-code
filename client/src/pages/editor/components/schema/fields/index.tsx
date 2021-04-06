import antd from './antd'
import basic from './basic'
import components from './components'
import { icons } from '../../Left'
import DragPanel from '../../Left/DragPanel'
import TreePanel from '../../TreePanel'
import React, { ReactElement } from 'react'

const menus: {
  key: string
  icon: keyof typeof icons
  panel: ReactElement
}[] = [
  {
    key: 'tree',
    icon: 'tree',
    panel: <TreePanel />,
  },
  {
    key: 'basic',
    icon: 'HTML5',
    panel: <DragPanel data={basic} />,
  },
  {
    key: 'antd',
    icon: 'antd',
    panel: <DragPanel data={antd} />,
  },
  {
    key: 'components',
    icon: 'components',
    panel: <DragPanel data={components} />,
  },
]

export default menus
