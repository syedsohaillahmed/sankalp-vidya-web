import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { getUserListdUC } from "../../api/svUrlConstructs";
import axios from "axios";
import useAxiosDataFunction from "../../hooks/useAxiosDataFunction";
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "../../SamplePages/DeepseekTable";
import { formatDate } from "../../utils/util";
import ListLoader from "../../components/loader/ListLoader";

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
      setUserListData(userListingResponse?.data?.data?.docs);
    }
  }, [userListingResponse]);

  return (
    <Box m="20px">
      <Header title="Users " subtitle={"Manage Users List"} />
      {
        userListingIsLoading && <ListLoader />
      }
      {userListData.length > 0 && (
        <Box >
          {/* <DeepseekTable /> */}
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
