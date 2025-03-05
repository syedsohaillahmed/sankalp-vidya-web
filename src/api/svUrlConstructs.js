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

export const getStudentsDetailsUC = (studentId)=>{
  return `${baseUrl}/users/student/${studentId}`
}

//chapter
export const getAllChapterUC = (studentId)=>{
  return `${baseUrl}/academic/chapter`
}

//genral
export const getAcademicyearUC = ()=>{
  return `${baseUrl}/academic/academicYearbatch`
}

export const getClassUC = ()=>{
  return `${baseUrl}/academic/class`
}

export const getSubjectUC = ()=>{
  return `${baseUrl}/academic/subject`
}



