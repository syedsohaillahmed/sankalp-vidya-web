import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useAxiosDataFunction from "../../../hooks/useAxiosDataFunction"
import { getStudentsListUC } from '../../../api/svUrlConstructs';
import StudentsListing from '../StudentsListing';
import axios from 'axios';

const Class9Students = () => {

    const accessToken = useSelector((state) => state?.data?.accessToken);
    const [
      studentsListingResponse,
      studentsListingError,
      studentsListingIsLoading,
      fetchStudentsListing,
    ] = useAxiosDataFunction();
  
    // fetch job Application List
    const getStudentsListing = () => {
      fetchStudentsListing({
        axiosInstance: axios,
        method: "get",
        url: getStudentsListUC(),
        token: accessToken,
      });
    };
  
    useEffect(() => {
      getStudentsListing();
    }, []);
  

  return (
    <StudentsListing studentsListingIsLoading={studentsListingIsLoading} studentsListingError={studentsListingError} studentsListingResponse={studentsListingResponse} />
  )
}

export default Class9Students