//USERS REDUCERS
export function usersReducers(state = {
  errors: [],
  users: [],
  user: []
}, action) {
  switch (action.type) {
    case "GET_USERS":
      return {...state, users:[...action.payload]}
    case "POST_USER":
      const user = {
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
      const errors = action.payload
      return {
        errors: [action.payload],
        users: [],
        user: []
      }
  }
  return state
}
