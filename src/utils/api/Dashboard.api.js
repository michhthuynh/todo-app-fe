import API from "../API"
import tokenConfig from "../tokenConfig"

export const callAddCollection = async (title, userID, id) => {
  try {
    const res = await API.post('/collection/create', {
      title,
      user_id: userID
    }, tokenConfig)
    return id
  } catch (error) {
    console.log("Can not connect database: ", error.message)
  }
}