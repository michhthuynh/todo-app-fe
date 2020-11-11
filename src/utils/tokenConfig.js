const tokenConfig = {
    headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`
    }
}

export default tokenConfig