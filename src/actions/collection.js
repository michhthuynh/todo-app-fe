export const addCollection = collection => {
  return {
    type: 'ADD_COLLECTION',
    payload: collection
  }
}

export const updateCollection = collection => {
  return {
    type: 'UPDATE_COLLECTION',
    payload: collection
  }
}

export const updateCollection = data => {
  return {
    type: 'CALL_RELOAD',
    payload: data
  }
}