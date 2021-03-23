import { FieldNode } from '../types'

const fields: FieldNode[] = [
  {
    type: 'Grid',
    module: '@/components',
    props: {
      rows: 2,
      cols: 2,
      gapX: 4,
      gapY: 4,
    },
  },
]

export default fields
