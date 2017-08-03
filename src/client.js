//REACT
import React from 'react'
import {render} from 'react-dom'
//REDUX
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'
//IMPORT COMBINED REDUCERS
import reducers from './reducers/index'
//IMPORT ACTIONS
import {postGroups, deleteGroups, updateGroups} from './actions/groupsActions'
import {postFunds, deleteFunds, updateFunds} from './actions/groupsActions'
//CREATE THE REDUX STORE
const middleware = applyMiddleware(thunk, logger)
const store = createStore(reducers, middleware)
//REACT-ROUTER
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
//COMPONENTS
import NavBar from './components/navBar'
import GroupsList from './components/pages/groupsList'
import LoginSignUp from './components/pages/loginSignUp'

const Routes = (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginSignUp} />
          <Route path="/" render={
            () => {
              return (
                <div>
                  <NavBar />
                  <div>
                  <Route path="/" component={GroupsList} />
                  </div>
                </div>
              )
            }
          }/>
        </Switch>
      </div>
    </Router>
  </Provider>
)
render(
  Routes, document.getElementById('app')
)
