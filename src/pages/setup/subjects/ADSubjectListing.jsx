import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosDataFunction from "../../../hooks/useAxiosDataFunction";
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

const ADSubjectListing = ({ createSubjectResponse }) => {
  const accessToken = useSelector((state) => state?.data?.accessToken);
  const [subjectListdata, setSubjectListData] = useState([]);

  const [subjectResponse, subjectError, subjectIsLoading, fetchSubject] =
    useAxiosDataFunction();

  // fetch job Application List
  const getSubject = () => {
    fetchSubject({
      axiosInstance: axios,
      method: "get",
      url: getSubjectUC(),
      token: accessToken,
    });
  };

  useEffect(() => {
    getSubject();
  }, []);

  useEffect(() => {
    if (subjectResponse?.data?.statuscode === 200) {
      setSubjectListData(subjectResponse?.data?.data);
    }
  }, [subjectResponse]);

  useEffect(() => {
    console.log("createSubjectResponse", createSubjectResponse);
    if (createSubjectResponse?.data?.statuscode === 201) {
      getSubject();
    }
  }, [createSubjectResponse]);

  const clickedTableRow = () => {};
  return (
    <>
      {subjectIsLoading && <ListLoader />}
      {!subjectIsLoading && subjectError && "Something Went wrong"}
      {!subjectIsLoading && !subjectError && subjectListdata?.length > 0 && (
        <Box sx={{ paddingBottom: "2rem" }}>
          <StyledTableContainer component={Paper}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <StyledTableCell>Sl.No</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Board</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {subjectListdata.length > 0 &&
                  subjectListdata?.map((row, index) => {
                    return (
                      <StyledTableRow
                        onClick={() => clickedTableRow(row)}
                        key={row.id}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.name || "--"}</TableCell>
                        <TableCell>{row.board || "--"}</TableCell>
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

export default ADSubjectListing;
