const baseUrl = "http://localhost:8000/api/v1"

export const getUserDetailsByIdUC= (userId)=>{
    return `${baseUrl}/users/user/${userId}`
}

// http://localhost:8000/api/v1/users/user/67b20d55a6d874eb70ee2609
// http://localhost:8000/api/v1/users/user/67b20d55a6d874eb70ee2609




export const getUserListdUC= ()=>{
    return `${baseUrl}/users/userList`
}
