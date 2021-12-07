import { combineReducers } from '@reduxjs/toolkit';

import codeTree from './codeTreeSlice';

const rootReducer = combineReducers({
  codeTree,
});

export default rootReducer;
