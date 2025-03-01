const baseUrl = "http://localhost:8000/api/v1";

//user
export const getUserDetailsByIdUC = (userId) => {
  return `${baseUrl}/users/user/${userId}`;
};

export const getUserListdUC = () => {
  return `${baseUrl}/users/userList`;
};


//students
export const getStudentsListUC = ()=>{
    return `${baseUrl}/users/student`
}