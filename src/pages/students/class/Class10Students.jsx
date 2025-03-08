import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosDataFunction from "../../../hooks/useAxiosDataFunction";
import {
  getFilteredStudentsListUC,
  getStudentsListUC,
} from "../../../api/svUrlConstructs";
import StudentsListing from "../StudentsListing";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { Box } from "@mui/material";
import CreateStudentForm from "../forms/CreateStudentForm";
import { StudentContext } from "../Student";
import { useContext } from "react";
const Class10Students = () => {
  const accessToken = useSelector((state) => state?.data?.accessToken);
  const navigate = useNavigate();
  const [classId, setClassId] = useState("")
  const {
    classResponse,
    classIsLoading,
    classError,
    deleteStudentResponse,
    deleteStudentError,
    deleteStudentIsLoading,
  } = useContext(StudentContext);
  const [
    studentsListingResponse,
    studentsListingError,
    studentsListingIsLoading,
    fetchStudentsListing,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const getStudentsListing = (classId) => {
    fetchStudentsListing({
      axiosInstance: axios,
      method: "get",
      url: getFilteredStudentsListUC(classId),
      token: accessToken,
    });
  };

  useEffect(() => {
    console.log("classResponse", classResponse);
    if (classResponse?.data?.statuscode === 200) {
      const classx = classResponse?.data?.data?.filter(
        (classItem) => classItem.classGrade === 10
      );

      if (classx && classx.length > 0) {
        const class10Id = classx[0]._id;

        setClassId(class10Id)
        getStudentsListing(class10Id);
      }
    }
  }, [classResponse]);

  useEffect(() => {
    if (deleteStudentResponse?.data?.statuscode === 200) {
      getStudentsListing(classId);
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

export default Class10Students;
