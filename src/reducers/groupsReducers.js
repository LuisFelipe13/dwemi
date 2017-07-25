//GROUPS REDUCERS
export function groupsReducers(state = {
  groups: []
}, action) {
  switch (action.type) {
    case "POST_GROUP":
      return {
        groups: [...state.groups, ...action.payload]
      }
    case "DELETE_GROUP":
      // Create a copy of the current array of groups
      const currentGroupToDelete = [...state.groups]
      // Determine at which index in books array is the group to be deleted
      const indexToDelete = currentGroupToDelete.findIndex(group => group.id === action.payload.id)
      //use slice to remove the group at the specified index
      return {
        groups: [...currentGroupToDelete.slice(0, indexToDelete),
          ...currentGroupToDelete.slice(indexToDelete + 1)]
      }
    case "UPDATE_GROUP":
      // Create a copy of the current array of groups
      const currentGroupToUpdate = [...state.groups]
      // Determine at which index in books array is the group to be deleted
      const indexToUpdate = currentGroupToUpdate.findIndex(group => group.id === action.payload.id)
      // Create a new group object with the new values and with the same array index of the item we want to replace.
      const newGroupToUpdate = {
        ...currentGroupToUpdate[indexToUpdate],
        name: action.payload.name
      }
      //use slice to remove the group at the specified index, replace with the new object and concatenate with the rest of items in the array
      return {
        groups: [...currentGroupToUpdate.slice(0, indexToUpdate),
          newGroupToUpdate,
          ...currentGroupToUpdate.slice(indexToUpdate + 1)]
      }
  }
  return state
}
