import { combineReducers } from '@reduxjs/toolkit'

import codeTree from '../pages/editor/codeTreeSlice'
import component from '../pages/editor/componentSlice'

const rootReducer = combineReducers({
  codeTree,
  component,
})

export default rootReducer
