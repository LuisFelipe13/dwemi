import {applyMiddleware, createStore} from 'redux'
import {logger} from 'redux-logger'
// IMPORT COMBINED REDUCERS
import reducers from './reducers/index'
// IMPORT ACTIONS
import {postGroups, deleteGroups, updateGroups} from './actions/groupsActions'

//STEP 1 create the store
const middleware = applyMiddleware(logger)
const store = createStore(reducers, middleware)


//STEP 2 create and dispatch actions
//POST a group/groups
store.dispatch(postGroups(
  [{
    id: 1,
    name: 'Roomates',
    fund: [
      {
        name: "Couch",
        description: "New Black Leather Ikea Couch",
        goal: 100,
        balance: 50
      },
      {
        name: "Spring Break",
        description: "1 week in Miami, FL",
        goal: 1000,
        balance: 200
      }
    ]
  },
  {
    id: 2,
    name: 'Coworkers',
    fund: [
      {
        name: "Birthday Cake",
        description: "For bob...",
        goal: 25,
        balance: 20
      },
      {
        name: "Ping Pong Table",
        description: "To replace broken one",
        goal: 500,
        balance: 100
      }
    ]
  }]
))
// DELETE a group
store.dispatch(deleteGroups({id: 1}))
// UPDATE a group
store.dispatch(updateGroups(
  {
    id: 2,
    name: 'Family'
  }
))
