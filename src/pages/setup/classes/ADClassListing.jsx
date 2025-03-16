import React, { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "../../../SamplePages/DeepseekTable";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { getClassByIdUC, getClassUC } from "../../../api/svUrlConstructs";
import axios from "axios";
import { useSelector } from "react-redux";
import useAxiosDataFunction from "../../../hooks/useAxiosDataFunction";
import ListLoader from "../../../components/loader/ListLoader";
import { formatDate } from "../../../utils/util";
import { DeleteForever, EditNote } from "@mui/icons-material";
import ConfirmationDialog from "../../../components/dialog/ConfirmationDialog";

const ADClassListing = ({ createClassResponse }) => {
  const accessToken = useSelector((state) => state?.data?.accessToken);
  const [classListdata, setClassListData] = useState([]);
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
    getClass();
  }, []);

  useEffect(() => {
    if (classResponse?.data?.statuscode === 200) {
      setClassListData(classResponse?.data?.data);
    }
  }, [classResponse]);

  useEffect(() => {
    if (createClassResponse?.data?.statuscode === 200) {
      getClass();
    }
  }, [createClassResponse]);

  const clickedTableRow = () => {};



  //delete functionlity
  const [CFDialogOpen, setCFDiaogOpen] = React.useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
  
    const handleDeleteClick = (row) => {
      setSelectedClass(row);
      setCFDiaogOpen(true);
    };
  
    const handleClose = () => {
      setSelectedClass(null);
      setCFDiaogOpen(false);
    };
  
    const [
      deleteClassResponse,
      deleteClassError,
      deleteClassIsLoading,
      deleteClass,
    ] = useAxiosDataFunction();
  
    // fetch job Application List
    const removeClass = (id) => {
      deleteClass({
        axiosInstance: axios,
        method: "delete",
        url: getClassByIdUC(id),
        token: accessToken,
      });
    };
  
    const handleDeleteClass = () => {
      if (selectedClass) {
        removeClass(selectedClass?._id);
        handleClose();
      }
    };
  
    
    useEffect(() => {
      if (deleteClassResponse?.data?.statuscode === 200) {
        getClass();
      }
    }, [deleteClassResponse]);

  return (
    <>
      {classIsLoading && <ListLoader />}
      {!classIsLoading && classError && "Something Went wrong"}
      {!classIsLoading && !classError && classListdata?.length > 0 && (
        <Box sx={{ paddingBottom: "2rem" }}>
          <StyledTableContainer component={Paper}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <StyledTableCell>Sl.No</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Class Grade</StyledTableCell>
                  <StyledTableCell>Created Date</StyledTableCell>
                  <StyledTableCell>Updated Date</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {classListdata.length > 0 &&
                  classListdata?.map((row, index) => {
                    return (
                      <StyledTableRow
                        onClick={() => clickedTableRow(row)}
                        key={row.id}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.name || "--"}</TableCell>
                        <TableCell>{row.classGrade || "--"}</TableCell>
                        <TableCell>
                          {formatDate(row.createdAt || "", "YYYY-MM-DD")}
                        </TableCell>

                        <TableCell>
                          {formatDate(row.updatedAt || "", "YYYY-MM-DD")}{" "}
                        </TableCell>
                        <TableCell>{"true/false"}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDeleteClick(row);
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
          <ConfirmationDialog 
          open={CFDialogOpen} 
                      dialogTitle={"Delete Class"}
                      dialogContentText={`Are you sure you want to delete ${selectedClass?.name}?`}
                      handleClose={handleClose}
                      handleConfirm={handleDeleteClass}
          />
        </Box>
      )}
    </>
  );
};

export default ADClassListing;
