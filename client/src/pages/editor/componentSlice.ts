import { createSlice } from '@reduxjs/toolkit'
import { FieldNode } from './components/schema/types'

export interface FieldNodeSchema extends FieldNode {
  id: string
  props: Record<string, any>
  children: FieldNodeSchema[]
}

export interface State {
  name: string
  code: string
}

const initialState: State = {
  name: '组件',
  code: 'Component',
}

const component = createSlice({
  name: 'component',
  initialState,
  reducers: {
    updateComBase: (state, action) => {
      const { name, code } = action.payload
      state.name = name
      state.code = code
    },
  }
})

export const {
  updateComBase,
} = component.actions

export default component.reducer
