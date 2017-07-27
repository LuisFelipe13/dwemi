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
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
          description: "New Black Leather Ikea Couch",
          goal: 100,
          balance: 50
        },
        {
          _id: 2,
          fundName: "Spring Break",
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
          description: "1 week in Miami, FL",
          goal: 1000,
          balance: 200
        },
        {
          _id: 3,
          fundName: "Couch",
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
          description: "New Black Leather Ikea Couch",
          goal: 100,
          balance: 50
        },
        {
          _id: 4,
          fundName: "Spring Break",
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
          description: "1 week in Miami, FL",
          goal: 1000,
          balance: 900
        },
        {
          _id: 5,
          fundName: "Couch",
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
          description: "New Black Leather Ikea Couch",
          goal: 100,
          balance: 50
        },
        {
          _id: 6,
          fundName: "Spring Break",
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
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
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
          description: "For bob...",
          goal: 25,
          balance: 20
        },
        {
          _id: 8,
          fundName: "Ping Pong Table",
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
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
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
          description: "New Black Leather Ikea Couch",
          goal: 100,
          balance: 50
        },
        {
          _id: 10,
          fundName: "Spring Break",
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
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
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
          description: "For bob...",
          goal: 25,
          balance: 20
        },
        {
          _id: 12,
          fundName: "Ping Pong Table",
          image: "http://u55.mpmserv.co.uk/users/55/7877/blankImage.png",
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
    case "POST_FUND":
      console.log(action.payload)
      var groupIndex = (action.payload[0] - 1)
      const fund = {
        fundName: action.payload[1],
        image: action.payload[2],
        description: action.payload[4],
        goal: action.payload[3],
        balance: 0
      }
      state.groups[groupIndex].funds.push(fund)
      var x = [...state.groups]
      return {
        groups: x
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
      var groupIndex = (action.payload[0] - 1)
      let fundId = action.payload[1]
      // Create a copy of the current array of groups and their funds
      const currentFundToDelete = [...state.groups]
      // Determine at which index within a group's funds array is the fund to be deleted
      const fundIndexToDelete = currentFundToDelete[groupIndex].funds.findIndex(fund => fund._id == fundId)
      //use slice to remove the fund at the specified index and return array of edited funds
      const editedFunds = [...currentFundToDelete[groupIndex].funds.slice(0, fundIndexToDelete),
          ...currentFundToDelete[groupIndex].funds.slice(fundIndexToDelete + 1)]
      //Pass the editedFunds array to the group it belongs to
      state.groups[groupIndex].funds = editedFunds
      var x = [...state.groups]
      return {
        groups: x
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
