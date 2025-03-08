import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useAxiosDataFunction from "../../../hooks/useAxiosDataFunction";
import { getStudentsListUC } from "../../../api/svUrlConstructs";
import StudentsListing from "../StudentsListing";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { Box } from "@mui/material";
import CreateStudentForm from "../forms/CreateStudentForm";
import { StudentContext } from "../Student";
import { useContext } from "react";
const ClassAllStudents = () => {
    const accessToken = useSelector((state) => state?.data?.accessToken);
    const navigate = useNavigate();
    const { deleteStudentResponse, deleteStudentError, deleteStudentIsLoading } =
      useContext(StudentContext);
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
  
    useEffect(() => {
      if (deleteStudentResponse?.data?.statuscode === 200) {
        getStudentsListing();
      }
    }, [deleteStudentResponse]);
  
    const clickedTableRow = (row) => {
      navigate(`/students/${row._id}`);
    };
  
    return (
      <>
        <Box sx={{ paddingBottom: "2rem" }} justifySelf={"flex-end"}>
          <CreateStudentForm />
        </Box>
        <StudentsListing
          clickedTableRow={clickedTableRow}
          studentsListingIsLoading={studentsListingIsLoading}
          studentsListingError={studentsListingError}
          studentsListingResponse={studentsListingResponse}
        />
      </>
    );
  };

export default ClassAllStudents