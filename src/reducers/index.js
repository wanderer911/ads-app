import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { ads } from './ads.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  ads
});

export default rootReducer;