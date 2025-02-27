import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { getUserListdUC } from "../../api/svUrlConstructs";
import axios from "axios";
import useAxiosDataFunction from "../../hooks/useAxiosDataFunction";
import CustomTable from "../../SamplePages/CustomTable";
import GeminiTable from "../../SamplePages/GeminiTable";
import DeepseekTable, {
  mockData,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "../../SamplePages/DeepseekTable";
import { formatDate } from "../../utils/util";

const UserListingPage = () => {
  const accessToken = useSelector((state) => state.data.accessToken);

  const [
    userListingResponse,
    userListingError,
    userListingIsLoading,
    fetchUserListing,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const getUserListing = () => {
    fetchUserListing({
      axiosInstance: axios,
      method: "get",
      url: getUserListdUC(),
      token: accessToken,
    });
  };

  useEffect(() => {
    getUserListing();
  }, []);

  const [userListData, setUserListData] = useState([]);

  useEffect(() => {
    if (userListingResponse?.data?.statuscode === 200) {
      console.log(userListingResponse);
      setUserListData(userListingResponse?.data?.data?.docs);
    }
  }, [userListingResponse]);
  console.log(userListData);
  const headers = ["Name", "Age", "Email"];

  return (
    <Box m="20px">
      <Header title="Users " subtitle={"Manage Users List"} />
      {userListData.length > 0 && (
        <Box >
          {/* <DeepseekTable /> */}
          <Box sx={{ padding: "2rem" }}>
            <StyledTableContainer component={Paper}>
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Full Name</StyledTableCell>
                    <StyledTableCell>Date of Birth</StyledTableCell>
                    <StyledTableCell>Gender</StyledTableCell>
                    <StyledTableCell>Phone No</StyledTableCell>
                    <StyledTableCell>Role</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {userListData?.map((row, index) => (
                    <StyledTableRow key={row.id}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell>{row.fullName}</TableCell>
                      <TableCell>{formatDate(row.dateOfBirth, "YYYY-MM-DD")}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.phoneNo}</TableCell>
                      <TableCell>{row.roleDisplayName}</TableCell>
                      <TableCell>{row.active? "true":"false"}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserListingPage;
