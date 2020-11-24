const initialState = {
  collection: [],
  update: [],
}

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COLLECTION': {
      let flag = false
      const newCollection = [...state.collection]
      const id = action.payload._id
      newCollection.forEach(res => {
        if (id === res['_id']) {
          flag = true
          return
        }
      })
      if (!flag) {
        newCollection.push(action.payload)
      }
      return {
        ...state,
        collection: newCollection,
      }
    }

    case 'UPDATE_COLLECTION': {
      const newCollection = [...state.update]
      const id = action.payload._id
      newCollection.forEach((res, index) => {
        if (id === res['_id']) {
          newCollection[index] = res
        }
      })
      return {
        ...state,
        collection: newCollection,
      }
    }

    default:
      return state
  }
}

export default collectionReducer