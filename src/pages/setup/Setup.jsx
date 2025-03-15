import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import MainCard from "../../components/cards/MainCard";
import ADClassListing from "./classes/ADClassListing";
import ADCreateClassForm from "./classes/ADCreateClassForm";
import ADSubjectListing from "./subjects/ADSubjectListing";
import ADAcadYearListing from "./academcYear/ADAcadYearListing";
import { getAcademicyearUC, getClassUC, getSubjectUC } from "../../api/svUrlConstructs";
import { useSelector } from "react-redux";
import useAxiosDataFunction from "../../hooks/useAxiosDataFunction";
import axios from "axios";
import AdCreateSubjectform from "./subjects/AdCreateSubjectform";
import AdCreateAcdmyYearForm from "./academcYear/AdCreateAcdmyYearForm";

const Setup = () => {
  const accessToken = useSelector((state) => state?.data?.accessToken);

  const [
    createClassResponse,
    createClassError,
    createClassIsLoading,
    createClass,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const PostClass = (data) => {
    createClass({
      axiosInstance: axios,
      method: "post",
      url: getClassUC(),
      data: data,
      token: accessToken,
    });
  };

  const [
    createSubjectResponse,
    createSubjectError,
    createSubjectIsLoading,
    createSubject,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const PostSubject = (data) => {
    createSubject({
      axiosInstance: axios,
      method: "post",
      url: getSubjectUC(),
      data: data,
      token: accessToken,
    });
  };

  const [
    createAcademicYearResponse,
    createAcademicYearError,
    createAcademicYearIsLoading,
    createAcademicYear,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const postAcademicYear = (data) => {
    createAcademicYear({
      axiosInstance: axios,
      method: "post",
      url: getAcademicyearUC(),
      data: data,
      token: accessToken,
    });
  };

  return (
    <Box m={1}>
      <Header title={"Setup"} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard title="Academic year" secondary={ <AdCreateAcdmyYearForm postAcademicYear={postAcademicYear}  /> } >
            <ADAcadYearListing createAcademicYearResponse={createAcademicYearResponse} />
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard
            title="Classes"
            secondary={<ADCreateClassForm PostClass={PostClass} />}
          >
            <ADClassListing createClassResponse={createClassResponse} />
          </MainCard>
        </Grid>{" "}
        <Grid item xs={12}>
          <MainCard
            title="Subjects"
            secondary={<AdCreateSubjectform PostSubject={PostSubject} />}
          >
            <ADSubjectListing createSubjectResponse={createSubjectResponse} />
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Setup;
