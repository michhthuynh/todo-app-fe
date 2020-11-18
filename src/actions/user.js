export const verifyLogin = isAuthentication => {
    return {
        type: 'VERIFY_LOGIN',
        payload: isAuthentication
    }
}

export const addUsername = username => {
    return {
        type: 'ADD_USERNAME',
        payload: username
    }
}

export const addUserID = id => {
    return {
        type: 'ADD_USER_ID',
        payload: id
    }
}