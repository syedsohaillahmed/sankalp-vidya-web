const baseUrl = "http://localhost:8000/api/v1"

export const getUserDetailsByIdUC= (userId)=>{
    return `${baseUrl}/users/${userId}`
}

export const getUserListdUC= ()=>{
    return `${baseUrl}/users`
}
