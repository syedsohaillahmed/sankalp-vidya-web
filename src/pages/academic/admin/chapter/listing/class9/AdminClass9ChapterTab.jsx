import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  getAcademicyearUC,
  getAllChapterUC,
  getChapterDetailsUC,
  getClassUC,
  getSubjectUC,
} from "../../../../../../api/svUrlConstructs";
import useAxiosDataFunction from "../../../../../../hooks/useAxiosDataFunction";
import { useMemo } from "react";
import { createContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import Header from "../../../../../../components/Header";
import AdminClass9AllChapters from "./AdminClass9AllChapters";

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

export const ChpterContext = createContext();

const AdminClass9ChapterTab = () => {
  const [value, setValue] = React.useState(0);
  const accessToken = useSelector((state) => state?.data?.accessToken);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const [subnjectResponse, subnjectError, subnjectIsLoading, fetchSubnject] =
    useAxiosDataFunction();

  // fetch job Application List
  const getSubject = () => {
    fetchSubnject({
      axiosInstance: axios,
      method: "get",
      url: getSubjectUC(),
      token: accessToken,
    });
  };

  const [
    createchapterResponse,
    createchapterError,
    createchapterIsLoading,
    createChapter,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const postChapter = (data) => {
    createChapter({
      axiosInstance: axios,
      method: "post",
      url: getAllChapterUC(),
      data: data,
      token: accessToken,
    });
  };

  const [
    deletechapterResponse,
    deletechapterError,
    deletechapterIsLoading,
    deleteChapter,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const removeChapter = (id) => {
    deleteChapter({
      axiosInstance: axios,
      method: "delete",
      url: getChapterDetailsUC(id),
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

      subnjectResponse,
      subnjectError,
      subnjectIsLoading,
      getSubject,

      postChapter,
      createchapterResponse,
      createchapterError,
      createchapterIsLoading,

      removeChapter,
      deletechapterResponse,
      deletechapterError,
      deletechapterIsLoading,
    }),
    [
      academicYearResponse,
      academicYearError,
      academicYearIsLoading,
      subnjectResponse,
      subnjectError,
      subnjectIsLoading,
      classResponse,
      classError,
      classIsLoading,
      createchapterResponse,
      createchapterError,
      createchapterIsLoading,
      deletechapterResponse,
      deletechapterError,
      deletechapterIsLoading,
    ]
  );

  useEffect(() => {
    getClass();
    getAcademicYear();
    getSubject();
  }, []);

  return (
    <ChpterContext.Provider value={contextValue}>
      <Box m="20px">
        <Header title="Chapter List " subtitle={"Manage Chapter List"} />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ padding: 0, m: 0 }}
            >
              <Tab label="All Chapters" {...a11yProps(0)} />
              <Tab label="Mathematics" {...a11yProps(1)} />
              <Tab label="Science" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel sx={{ padding: 0, m: 0 }} value={value} index={0}>
            <AdminClass9AllChapters />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Box>
    </ChpterContext.Provider>
  );
};

export default AdminClass9ChapterTab;
