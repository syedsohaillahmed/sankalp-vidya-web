import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
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
import CreateStudentForm from "./forms/CreateStudentForm";
import { DeleteForever } from "@mui/icons-material";
import ConfirmationDialog from "../../components/dialog/ConfirmationDialog";
import { useContext } from "react";
import { StudentContext } from "./Student";
const StudentsListing = ({
  studentsListingIsLoading,
  studentsListingError,
  studentsListingResponse,
  clickedTableRow,
  confirmDelete,
}) => {
  const [studentListData, setStudentListData] = useState([]);

  useEffect(() => {
    if (studentsListingResponse?.data?.statuscode === 200) {
      setStudentListData(studentsListingResponse?.data?.data?.docs);
    }
  }, [studentsListingResponse]);

  const [open, setOpen] = React.useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const {removeStudent} = useContext(StudentContext)

  const handleClose = () => {
    setSelectedStudentId(null)
    setOpen(false);
  };

  const handleDeleteClick = (row) => {
    setSelectedStudentId(row);
    setOpen(true);
  };

  console.log("selectedStudentId", selectedStudentId);
  const handleDeleteStudent = () => {
    if(setSelectedStudentId){
      removeStudent(selectedStudentId._id)
      handleClose()
    }
  };

  return (
    <>
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
                    <StyledTableCell>Delete</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {studentListData.length > 0 &&
                    studentListData?.map((row, index) => {
                      return (
                        <StyledTableRow
                          onClick={() => clickedTableRow(row)}
                          key={row.id}
                        >
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
                          <TableCell>
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDeleteClick(row);
                              }}
                            >
                              <DeleteForever />
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

      <ConfirmationDialog
        open={open}
        dialogTitle={"Delete Student"}
        dialogContentText={`Are you sure you want to delete ${selectedStudentId?.basicDetails?.fullName}?`}
        handleClose={handleClose}
        handleConfirm={handleDeleteStudent}
      />
    </>
  );
};

export default memo(StudentsListing);
