import { combineReducers } from '@reduxjs/toolkit'

import codeTree from '../pages/editor/codeTreeSlice'

const rootReducer = combineReducers({
  codeTree,
})

export default rootReducer
