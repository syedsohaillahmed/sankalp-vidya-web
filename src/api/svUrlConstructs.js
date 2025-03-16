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
// localhost:8000/api/v1/users/student?gender=male&classId=67b0c71a4d2ec69a23910599
export const getFilteredStudentsListUC = (classId)=>{
  return `${baseUrl}/users/student?classId=${classId}`
}

export const getStudentsDetailsUC = (studentId)=>{
  return `${baseUrl}/users/student/${studentId}`
}

//chapter
export const getAllChapterUC = ()=>{
  return `${baseUrl}/academic/chapter`
}

export const getChapterDetailsUC = (chapterId)=>{
  return `${baseUrl}/academic/chapter/${chapterId}`
}

export const uploadVideoLinkUC = (chapterId)=>{
  return `${baseUrl}/academic/chapter/${chapterId}/videoUrl`
}






//genral
// academic year
export const getAcademicyearUC = ()=>{
  return `${baseUrl}/academic/academicYearbatch`
}

export const getAcademicyearByIdUC = (id)=>{
  return `${baseUrl}/academic/academicYearbatch/${id}`
}

//class
export const getClassUC = ()=>{
  return `${baseUrl}/academic/class`
}

export const getClassByIdUC = (id)=>{
  return `${baseUrl}/academic/class/${id}`
}


//subject
export const getSubjectUC = ()=>{
  return `${baseUrl}/academic/subject`
}

export const getSubjectByIdUC = (id)=>{
  return `${baseUrl}/academic/subject/${id}`
}



