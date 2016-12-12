import { combineReducers } from 'redux';
import AllReducers from './all-reducers';

const rootReducer = combineReducers({
  reducers: AllReducers
});

export default rootReducer;
