const initialState = {
  isAuthentication: false,
  msgError: '',
  username: "",
  id: ""
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VERIFY_LOGIN': {
      return {
        ...state,
        isAuthentication: action.payload
      }
    }

    case 'ADD_USER_ID': {
      return {
        ...state,
        id: action.payload
      }
    }

    case 'ADD_USERNAME': {
      return {
        ...state,
        username: action.payload
      }
    }

    default:
      return state
  }
}

export default userReducer