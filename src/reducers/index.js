import {combineReducers} from 'redux'
// HERE IMPORT REDUCERS TO BE COMBINED
import {groupsReducers} from './groupsReducers'
import {usersReducers} from './usersReducers'
//HERE COMBINE THE REDUCERS
export default combineReducers({
  groups: groupsReducers,
  users: usersReducers
})
