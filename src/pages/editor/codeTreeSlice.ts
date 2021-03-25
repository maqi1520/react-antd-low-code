import { createSlice } from '@reduxjs/toolkit'
import { v1 as uuid } from 'uuid'
import { traverse, traverseUp } from '../../utils'
import { FieldNode } from './components/schema/types'

export interface FieldNodeSchema extends FieldNode {
  id: string
  props: Record<string, any>
  children: FieldNodeSchema[]
}

export interface State extends FieldNodeSchema {
  focusId?: string
}

const initialState: State = {
  props: {},
  id: 'root',
  type: 'div',
  children: [],
}

const codeTree = createSlice({
  name: 'codeTree',
  initialState,
  reducers: {
    append: (state, action) => {
      const focusId = uuid()
      state.focusId = focusId
      const { type } = action.payload
      let children: any[] = []
      if (type === 'Grid') {
        children = new Array(4).fill('1').map(() => ({
          id: uuid(),
          type: 'div',
          props: {
            className: '',
          },
        }))
      }
      if (type === 'Form') {
        children = new Array(3).fill('1').map((it, i) => ({
          id: uuid(),
          type: 'Form.Item',
          props: {
            name: 'field' + i,
            label: 'field' + i,
          },
          children: [
            {
              type: 'Input',
              id: uuid(),
              childElement: true,
              module: 'antd',
              props: {},
            },
          ],
        }))
      }

      state.children.push({
        ...action.payload,
        children,
        id: focusId,
      })
    },
    appendCom: (state, action) => {
      const { data, item, hoverParentId, hoverIndex } = action.payload

      const focusId = uuid()

      traverse(state, (sub) => {
        //非嵌套标签往父层插入
        if (data.childElement && sub.id === hoverParentId) {
          sub.children.splice(hoverIndex + 1, 0, { ...item, id: focusId })
          return false
        }
        if (!data.childElement && sub.id === data.id) {
          if (sub.children && sub.children.length > 0) {
            sub.children.push({
              ...item,
              id: focusId,
            })
          } else {
            sub.children = [{ ...item, id: focusId }]
          }

          return false
        }
        return true
      })
      state.focusId = focusId
    },
    moveCom: (state, action) => {
      const {
        data: hoverData,
        item: dragData,
        hoverParentId: hId,
        hoverIndex: hIndex,
        dragParentId,
        dragIndex,
      } = action.payload

      if (hoverData.id === dragData.id) return state
      //在子节点中不拖拽
      let hoverInDragData = false

      traverse(dragData, (sub) => {
        if (sub.id === hoverData.id) {
          hoverInDragData = true
          return false
        }
        return true
      })

      if (hoverInDragData) return state

      const focusId = uuid()

      traverse(state, (sub) => {
        if (sub.id === dragParentId) {
          sub.children.splice(dragIndex, 1)
          return false
        }
        return true
      })

      traverse(state, (sub) => {
        //非嵌套标签往父层插入
        if (hoverData.childElement && sub.id === hId) {
          sub.children.splice(hIndex + 1, 0, { ...dragData, id: focusId })
          return false
        }
        if (!hoverData.childElement && sub.id === hoverData.id) {
          if (sub.children) {
            sub.children.push({
              ...dragData,
              id: focusId,
            })
          } else {
            sub.children = [{ ...dragData, id: focusId }]
          }
          return false
        }
        return true
      })

      state.focusId = focusId
    },
    setFocus: (state, action) => {
      const { focusId } = action.payload
      state.focusId = focusId
    },
    removeCom: (state, action) => {
      const { id, parentId } = action.payload
      traverse(state, (sub) => {
        if (sub.id === parentId) {
          sub.children = sub.children.filter((child) => child.id !== id)
          return false
        }
        return true
      })
    },
    updateTree: (state, action) => {
      const { focusId } = state
      const { key, value } = action.payload
      traverse(state, (sub) => {
        if (sub.id === focusId) {
          sub.props[key] = value
          return false
        }
        return true
      })
    },
  },
})

export const {
  append,
  appendCom,
  moveCom,
  setFocus,
  removeCom,
  updateTree,
} = codeTree.actions

export default codeTree.reducer
