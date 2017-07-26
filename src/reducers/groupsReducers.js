//GROUPS REDUCERS
export function groupsReducers(state = {
  groups:
    [{
      _id: 1,
      groupName: 'Roomates',
      funds: [
        {
          _id: 1,
          fundName: "Couch",
          description: "New Black Leather Ikea Couch",
          goal: 100,
          balance: 50
        },
        {
          _id: 2,
          fundName: "Spring Break",
          description: "1 week in Miami, FL",
          goal: 1000,
          balance: 200
        },
        {
          _id: 3,
          fundName: "Couch",
          description: "New Black Leather Ikea Couch",
          goal: 100,
          balance: 50
        },
        {
          _id: 4,
          fundName: "Spring Break",
          description: "1 week in Miami, FL",
          goal: 1000,
          balance: 900
        },
        {
          _id: 5,
          fundName: "Couch",
          description: "New Black Leather Ikea Couch",
          goal: 100,
          balance: 50
        },
        {
          _id: 6,
          fundName: "Spring Break",
          description: "1 week in Miami, FL",
          goal: 1000,
          balance: 200
        }
      ]
    },
    {
      _id: 2,
      groupName: 'Coworkers',
      funds: [
        {
          _id: 7,
          fundName: "Birthday Cake",
          description: "For bob...",
          goal: 25,
          balance: 20
        },
        {
          _id: 8,
          fundName: "Ping Pong Table",
          description: "To replace broken one",
          goal: 500,
          balance: 100
        }
      ]
    },
    {
      _id: 3,
      groupName: 'Family',
      funds: [
        {
          _id: 9,
          fundName: "Couch",
          description: "New Black Leather Ikea Couch",
          goal: 100,
          balance: 50
        },
        {
          _id: 10,
          fundName: "Spring Break",
          description: "1 week in Miami, FL",
          goal: 1000,
          balance: 200
        }
      ]
    },
    {
      _id: 4,
      groupName: 'Coworkers',
      funds: [
        {
          _id: 11,
          fundName: "Birthday Cake",
          description: "For bob...",
          goal: 25,
          balance: 20
        },
        {
          _id: 12,
          fundName: "Ping Pong Table",
          description: "To replace broken one",
          goal: 500,
          balance: 100
        }
      ]
    }]
}, action) {
  switch (action.type) {
    case "GET_GROUPS":
      return {...state, groups:[...state.groups]}
    case "POST_GROUP":
      return {
        groups: [...state.groups, ...action.payload]
      }
    case "DELETE_GROUP":
      // Create a copy of the current array of groups
      const currentGroupToDelete = [...state.groups]
      // Determine at which index in group array is the group to be deleted
      const indexToDelete = currentGroupToDelete.findIndex(group => group._id == action.payload)
      //use slice to remove the group at the specified index
      return {
        groups: [...currentGroupToDelete.slice(0, indexToDelete),
          ...currentGroupToDelete.slice(indexToDelete + 1)]
      }
    case "UPDATE_GROUP":
      // Create a copy of the current array of groups
      const currentGroupToUpdate = [...state.groups]
      // Determine at which index in groups array is the group to be deleted
      const indexToUpdate = currentGroupToUpdate.findIndex(group => group._id == action.payload._id)
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
