//GROUPS REDUCERS
export function groupsReducers(state = {
  groups: []
}, action) {
  switch (action.type) {
    case "GET_GROUPS":
      return {...state, groups:[...action.payload]}
    case "POST_GROUP":
      return {
        groups: [...state.groups, ...action.payload]
      }
    case "POST_FUND":
      // Create a copy of the current array of groups and their funds
      const currentGroupsFundsToAddInto = [...state.groups]
      const groupIndexNeeded = currentGroupsFundsToAddInto.findIndex(group => group._id == action.payload._id)
      const index = (action.payload.funds.length - 1);
      const fund = {
        fundName: action.payload.funds[index].fundName,
        image: action.payload.funds[index].image,
        description: action.payload.funds[index].description,
        goal: action.payload.funds[index].goal,
        balance: 0,
        _id: action.payload.funds[index]._id
      }
      state.groups[groupIndexNeeded].funds.push(fund)
      return {
        groups: [...state.groups]
      }
    case "DELETE_GROUP":
      // Create a copy of the current array of groups
      const currentGroupToDelete = [...state.groups]
      // Determine at which index in group array is the group to be deleted
      const groupIndexToDelete = currentGroupToDelete.findIndex(group => group._id == action.payload)
      //use slice to remove the group at the specified index
      return {
        groups: [...currentGroupToDelete.slice(0, groupIndexToDelete),
          ...currentGroupToDelete.slice(groupIndexToDelete + 1)]
      }
    case "DELETE_FUND":
      // Create a copy of the current array of groups and their funds
      const currentGroupsFundsToEdit = [...state.groups]
      const groupIndex = currentGroupsFundsToEdit.findIndex(group => group._id == action.payload[0])
      let fundId = action.payload[1]
      // Determine at which index within a group's funds array is the fund to be deleted
      const fundIndexToDelete = currentGroupsFundsToEdit[groupIndex].funds.findIndex(fund => fund._id == fundId)
      //use slice to remove the fund at the specified index and return array of edited funds
      const editedFunds = [...currentGroupsFundsToEdit[groupIndex].funds.slice(0, fundIndexToDelete),
          ...currentGroupsFundsToEdit[groupIndex].funds.slice(fundIndexToDelete + 1)]
      //Pass the editedFunds array to the group it belongs to
      state.groups[groupIndex].funds = editedFunds
      return {
        groups: [...state.groups]
      }
    case "UPDATE_GROUP":
      // Create a copy of the current array of groups
      const currentGroupToUpdate = [...state.groups]
      // Determine at which index in groups array is the group to be deleted
      const indexToUpdate = currentGroupToUpdate.findIndex(group => group._id == action.payload)
      // Create a new group object with the new values and with the same array index of the item we want to replace.
      const newGroupToUpdate = {
        ...currentGroupToUpdate[indexToUpdate],
        groupName: action.payload.groupName
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
