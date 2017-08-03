//USERS REDUCERS
export function usersReducers(state = {
  errors: [],
  user: [],
  users: []
}, action) {
  switch (action.type) {
    case "GET_USERS":
      return {...state, users:[...action.payload]}
    case "GET_USER":
      var user = {
        name: action.payload[0],
        email: action.payload[1],
        groups: action.payload[2]
      }
      return {
        errors: [],
        users: [],
        user: [user]
      }
    case "GET_USER_REJECTED":
      const errors = [{
        msg: action.payload
      }]
      return {
        errors: [errors],
        users: [],
        user: []
      }
    case "POST_USER":
      var user = {
        name: action.payload[0],
        email: action.payload[1],
        groups: []
      }
      state.users.push(user)
      state.user.push(user)
      return {
        errors: [],
        users: [...state.users],
        user: [...state.user]
      }
    case "POST_USER_REJECTED":
      var errors = action.payload
      return {
        errors: [action.payload],
        users: [],
        user: []
      }
  }
  return state
}
