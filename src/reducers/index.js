import {combineReducers} from 'redux'
// HERE IMPORT REDUCERS TO BE COMBINED
import {groupsReducers} from './groupsReducers'
//HERE COMBINE THE REDUCERS
export default combineReducers({
  groups: groupsReducers
})
