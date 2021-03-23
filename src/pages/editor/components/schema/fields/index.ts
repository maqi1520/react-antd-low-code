import antd from './antd'
import basic from './basic'
import components from './components'
import { icons } from '../../Left'
import { FieldNode } from '../types'

const menus: {
  key: string
  icon: keyof typeof icons
  data: FieldNode[]
}[] = [
  {
    key: 'basic',
    icon: 'HTML5',
    data: basic,
  },
  {
    key: 'antd',
    icon: 'antd',
    data: antd,
  },
  {
    key: 'components',
    icon: 'components',
    data: components,
  },
]

export default menus
