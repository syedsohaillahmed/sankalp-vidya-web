import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import Header from "../../components/Header";
import ListLoader from "../../components/loader/ListLoader";
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "../../SamplePages/DeepseekTable";
import { formatDate } from "../../utils/util";
const StudentsListing = ({
  studentsListingIsLoading,
  studentsListingError,
  studentsListingResponse,
  clickedTableRow
}) => {
  const [studentListData, setStudentListData] = useState([]);

  useEffect(() => {
    if (studentsListingResponse?.data?.statuscode === 200) {
      setStudentListData(studentsListingResponse?.data?.data?.docs);
    }
  }, [studentsListingResponse]);

  return (
    <Box m="20px">
      <Header title="Students List " subtitle={"Manage Students List"} />
      {studentsListingIsLoading && <ListLoader />}
      {!studentsListingIsLoading && studentsListingError && (
        <div> Error occured</div>
      )}
      {!studentsListingIsLoading &&
        !studentsListingError &&
        studentListData?.length > 0 && (
          <Box sx={{ paddingBottom: "2rem" }}>
            <StyledTableContainer component={Paper}>
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Full Name</StyledTableCell>
                    <StyledTableCell>Date of Birth</StyledTableCell>
                    <StyledTableCell>Gender</StyledTableCell>
                    <StyledTableCell>Phone No</StyledTableCell>
                    <StyledTableCell>School</StyledTableCell>
                    <StyledTableCell>Academic Year</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {studentListData.length > 0 &&
                    studentListData?.map((row, index) => {
                      return (
                        <StyledTableRow onClick={()=>clickedTableRow(row)} key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {row.basicDetails.fullName || "--"}
                          </TableCell>
                          <TableCell>
                            {formatDate(
                              row.basicDetails.dateOfBirth || "",
                              "YYYY-MM-DD"
                            )}
                          </TableCell>
                          <TableCell>
                            {row.basicDetails.gender || "--"}
                          </TableCell>
                          <TableCell>
                            {row.basicDetails.phoneNo || "--"}
                          </TableCell>
                          <TableCell>{row.schoolName || "--"}</TableCell>
                          <TableCell>
                            {row?.academicYear?.displayName || "--"}
                          </TableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Box>
        )}
    </Box>
  );
};

export default memo(StudentsListing);
