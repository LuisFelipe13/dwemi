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
// DELETE A GROUP
export function deleteGroups(_id) {
  return {
    type: "DELETE_GROUP",
    payload: _id
  }
}
// UPDATE A GROUP
export function updateGroups(group) {
  return {
    type: "UPDATE_GROUP",
    payload: group
  }
}
