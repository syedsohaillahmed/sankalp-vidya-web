import { Box, Grid } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import MainCard from "../../components/cards/MainCard";
import ADClassListing from "./classes/ADClassListing";
import ADCreateClassForm from "./classes/ADCreateClassForm";
import ADSubjectListing from "./subjects/ADSubjectListing";
import ADAcadYearListing from "./academcYear/ADAcadYearListing";

const Setup = () => {
  return (
    <Box>
      <Header title={"Setup"} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard title="Academic year">
            <ADAcadYearListing />
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard title="Classes" secondary={<ADCreateClassForm />}>
            <ADClassListing />
          </MainCard>
        </Grid>{" "}
        <Grid item xs={12}>
          <MainCard title="Subjects">
            <ADSubjectListing />
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Setup;
