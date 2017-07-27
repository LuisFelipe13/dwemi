//REACT
import React from 'react'
import {render} from 'react-dom'
//REDUX
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import {logger} from 'redux-logger'
//IMPORT COMBINED REDUCERS
import reducers from './reducers/index'
//IMPORT ACTIONS
import {postGroups, deleteGroups, updateGroups} from './actions/groupsActions'
import {postFunds, deleteFunds, updateFunds} from './actions/groupsActions'

//CREATE THE REDUX STORE
const middleware = applyMiddleware(logger)
const store = createStore(reducers, middleware)

import GroupsList from './components/pages/groupsList'

render(
  <Provider store={store}>
    <GroupsList />
  </Provider>, document.getElementById('app')
)

//POST a group/groups
// store.dispatch(postGroups(
//   [{
//     id: 1,
//     groupName: 'Roomates',
//     funds: [
//       {
//         id: 1,
//         fundName: "Couch",
//         description: "New Black Leather Ikea Couch",
//         goal: 100,
//         balance: 50
//       },
//       {
//         id: 2,
//         fundName: "Spring Break",
//         description: "1 week in Miami, FL",
//         goal: 1000,
//         balance: 200
//       }
//     ]
//   },
//   {
//     id: 2,
//     groupName: 'Coworkers',
//     funds: [
//       {
//         id: 1,
//         fundName: "Birthday Cake",
//         description: "For bob...",
//         goal: 25,
//         balance: 20
//       },
//       {
//         id: 2,
//         fundName: "Ping Pong Table",
//         description: "To replace broken one",
//         goal: 500,
//         balance: 100
//       },
//   {
//     id: 2,
//     groupName: 'Coworkers',
//     funds: []
//   }]
// ))
// DELETE a group
// store.dispatch(deleteGroups({id: 1}))
// // UPDATE a group
// store.dispatch(updateGroups(
//   {
//     id: 2,
//     Groupname: 'Family'
//   }
// ))
