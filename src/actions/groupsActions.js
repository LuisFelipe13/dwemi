// GET GROUPS
export function getGroups(group) {
  return {
    type: "GET_GROUPS"
  }
}
// POST A GROUP
export function postGroups(group) {
  return {
    type: "POST_GROUP",
    payload: group
  }
}
// POST A FUND
export function postFunds(fund) {
  return {
    type: "POST_FUND",
    payload: fund
  }
}
// DELETE A GROUP
export function deleteGroups(_id) {
  return {
    type: "DELETE_GROUP",
    payload: _id
  }
}
// DELETE A FUND
export function deleteFunds(groupId, fundId) {
  return {
    type: "DELETE_FUND",
    payload: [groupId, fundId]
  }
}
// UPDATE A GROUP
export function updateGroups(group) {
  return {
    type: "UPDATE_GROUP",
    payload: group
  }
}
