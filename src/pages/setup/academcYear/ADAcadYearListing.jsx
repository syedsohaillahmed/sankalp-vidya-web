import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosDataFunction from "../../../hooks/useAxiosDataFunction";
import { getAcademicyearUC } from "../../../api/svUrlConstructs";
import axios from "axios";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import { getSubjectUC } from "../../../api/svUrlConstructs";
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "../../../SamplePages/DeepseekTable";
import { DeleteForever, EditNote } from "@mui/icons-material";
import ListLoader from "../../../components/loader/ListLoader";
import { formatDate } from "../../../utils/util";

const ADAcadYearListing = () => {
  const accessToken = useSelector((state) => state?.data?.accessToken);
  const [academcYearListing, setAcademecYearListing] = useState([]);

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

  useEffect(() => {
    getAcademicYear();
  }, []);

  useEffect(() => {
    if (academicYearResponse?.data?.statuscode === 200) {
      setAcademecYearListing(academicYearResponse?.data?.data);
    }
  }, [academicYearResponse]);
  const clickedTableRow = () => {};
  return (
    <>
      {academicYearIsLoading && <ListLoader />}
      {!academicYearIsLoading && academicYearError && "Something Went wrong"}
      {!academicYearIsLoading &&
        !academicYearError &&
        academcYearListing?.length > 0 && (
          <Box sx={{ paddingBottom: "2rem" }}>
            <StyledTableContainer component={Paper}>
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell>Sl.No</StyledTableCell>
                    <StyledTableCell>Academic Year</StyledTableCell>
                    <StyledTableCell>Batch code</StyledTableCell>
                    <StyledTableCell>Batch Name</StyledTableCell>
                    <StyledTableCell>Start date</StyledTableCell>
                    <StyledTableCell>Update date</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {academcYearListing.length > 0 &&
                    academcYearListing?.map((row, index) => {
                      return (
                        <StyledTableRow
                          onClick={() => clickedTableRow(row)}
                          key={row.id}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.academicYear || "--"}</TableCell>
                          <TableCell>{row.batchCode || "--"}</TableCell>
                          <TableCell>{row.batchName || "--"}</TableCell>
                          <TableCell>
                            {formatDate(row.startDate || "")}
                          </TableCell>
                          <TableCell>
                            {formatDate(row.updatedAt || "")}
                          </TableCell>
                          <TableCell>{"true/false"}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                // handleDeleteClick(row);
                              }}
                            >
                              <DeleteForever />
                            </IconButton>
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                // handleDeleteClick(row);
                              }}
                            >
                              <EditNote />
                            </IconButton>
                          </TableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Box>
        )}
    </>
  );
};

export default ADAcadYearListing;
