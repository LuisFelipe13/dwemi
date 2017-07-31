import axios from 'axios'
// GET GROUPS
export function getGroups() {
  return function(dispatch) {
    axios.get("/groups")
      .then(function(response) {
        dispatch({
          type: "GET_GROUPS",
          payload: response.data
        })
      })
      .catch(function(err) {
        dispatch({
          type: "GET_GROUPS_REJECTED",
          payload: err
        })
      })
  }
}
// POST A GROUP
export function postGroups(group) {
  return function(dispatch) {
    axios.post("/groups", group)
      .then(function(response) {
        dispatch({
          type: "POST_GROUP",
          payload: response.data
        })
      })
      .catch(function(err) {
        dispatch({
          type: "POST_GROUP_REJECTED",
          payload: err
        })
      })
  }
}
// POST A FUND
export function postFunds(groupId, fundName, imageUrl, goal, description) {
  const fund = {
    fundName: fundName,
    image: imageUrl,
    description: description,
    goal: goal,
    balance: 0
  }
  return function(dispatch) {
    axios.put(`/groups/${groupId}/funds/`, fund)
      .then(function(response) {
        dispatch({
          type: "POST_FUND",
          payload: response.data
        })
      })
      .catch(function(err) {
        dispatch({
          type: "POST_FUND_REJECTED",
          payload: err
        })
      })
  }
}
// DELETE A GROUP
export function deleteGroups(id) {
  return function(dispatch) {
    axios.delete("/groups/" + id)
      .then(function(response) {
        dispatch({
          type: "DELETE_GROUP",
          payload: id
        })
      })
      .catch(function(err) {
        dispatch({
          type: "DELETE_GROUP_REJECTED",
          payload: err
        })
      })
  }
}
// DELETE A FUND
export function deleteFunds(groupId, fundId) {
  return function(dispatch) {
    axios.delete(`/groups/${groupId}/funds/${fundId}`)
      .then(function(response) {
        dispatch({
          type: "DELETE_FUND",
          payload: [groupId, fundId]
        })
      })
      .catch(function(err) {
        dispatch({
          type: "DELETE_GROUP_REJECTED",
          payload: err
        })
      })
  }
}
// UPDATE A GROUP
export function updateGroups(group) {
  return {
    type: "UPDATE_GROUP",
    payload: group
  }
}
