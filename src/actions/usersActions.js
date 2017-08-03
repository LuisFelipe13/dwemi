import axios from 'axios'
// GET USERS
export function getUsers() {
  return function(dispatch) {
    axios.get("/users")
      .then(function(response) {
        dispatch({
          type: "GET_USERS",
          payload: response.data
        })
      })
      .catch(function(err) {
        dispatch({
          type: "GET_USERS_REJECTED",
          payload: err
        })
      })
  }
}
// GET A USER
export function getUser(email, password) {
  return function(dispatch) {
    axios.get(`/users/${email}/${password}`)
      .then(function(response) {
        console.log(response);
        if (response.data === "Invalid password") {
          dispatch({
            type: "GET_USER_REJECTED",
            payload: response.message
          })
        } else {
          dispatch({
            type: "GET_USER",
            payload: [response.data.email, response.data.name]
          })
        }
      })
  }
}
// POST A USER
export function postUsers(firstName, lastName, email, emailConfirmation, password, passwordConfirmation) {
  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    emailConfirmation: emailConfirmation,
    password: password,
    passwordConfirmation: passwordConfirmation,
    groups: []
  }
  let name = `${firstName} ${lastName}`
  return function(dispatch) {
    axios.post("/users", user)
      .then(function(response) {
        if (response.data.errors) {
          dispatch({
            type: "POST_USER_REJECTED",
            payload: response.data.errors
          })
        } else {
          console.log(name)
          dispatch({
            type: "POST_USER",
            payload: [name, email]
          })
        }
      })
  }
}
