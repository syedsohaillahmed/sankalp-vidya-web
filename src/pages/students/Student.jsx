import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StudentsListing from "./StudentsListing";
import Class9Students from "./class/Class9Students";
import {
  getAcademicyearUC,
  getClassUC,
  getStudentsDetailsUC,
  getStudentsListUC,
} from "../../api/svUrlConstructs";
import { useEffect } from "react";
import axios from "axios";
import useAxiosDataFunction from "../../hooks/useAxiosDataFunction";
import { useSelector } from "react-redux";
import { createContext } from "react";
import { useMemo } from "react";
import Header from "../../components/Header";
import ClassAllStudents from "./class/ClassAllStudents";
import Class10Students from "./class/Class10Students";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const StudentContext = createContext();

const Student = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const accessToken = useSelector((state) => state?.data?.accessToken);
  const [
    academicYearResponse,
    academicYearError,
    academicYearIsLoading,
    fetchacAdemicYear,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const getAcademicYear = () => {
    fetchacAdemicYear({
      axiosInstance: axios,
      method: "get",
      url: getAcademicyearUC(),
      token: accessToken,
    });
  };

  const [classResponse, classError, classIsLoading, fetchClass] =
    useAxiosDataFunction();

  // fetch job Application List
  const getClass = () => {
    fetchClass({
      axiosInstance: axios,
      method: "get",
      url: getClassUC(),
      token: accessToken,
    });
  };

  useEffect(() => {
    getAcademicYear();
    getClass();
  }, []);

  const [
    createStudentResponse,
    createStudentError,
    createStudentIsLoading,
    createStudent,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const registerStudent = (data) => {
    createStudent({
      axiosInstance: axios,
      method: "post",
      url: getStudentsListUC(),
      data: data,
      token: accessToken,
    });
  };

  const [
    deleteStudentResponse,
    deleteStudentError,
    deleteStudentIsLoading,
    deleteStudent,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const removeStudent = (id) => {
    deleteStudent({
      axiosInstance: axios,
      method: "delete",
      url: getStudentsDetailsUC(id),
      // data: data,
      token: accessToken,
    });
  };

  const contextValue = useMemo(
    () => ({
      academicYearResponse,
      academicYearError,
      academicYearIsLoading,
      getAcademicYear,

      classResponse,
      classIsLoading,
      classError,
      getClass,

      createStudentResponse,
      createStudentError,
      createStudentIsLoading,
      registerStudent,

      deleteStudentResponse,
      deleteStudentError,
      deleteStudentIsLoading,

      removeStudent,
    }),
    [
      academicYearResponse,
      academicYearError,
      academicYearIsLoading,
      createStudentResponse,
      createStudentError,
      createStudentIsLoading,
      classResponse,
      classIsLoading,
      classError,
      deleteStudentResponse,
      deleteStudentError,
      deleteStudentIsLoading,
    ]
  );

  return (
    <StudentContext.Provider value={contextValue}>
      <Box m="20px">
        <Header title="Students List " subtitle={"Manage Students List"} />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All Students" {...a11yProps(0)} />
              <Tab label="Class 9" {...a11yProps(1)} />
              <Tab label="Class 10" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
          <ClassAllStudents />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <Class9Students />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
          <Class10Students />
           
          </CustomTabPanel>
        </Box>
      </Box>
    </StudentContext.Provider>
  );
};

export default Student;
