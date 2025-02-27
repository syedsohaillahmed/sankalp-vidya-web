import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { getUserListdUC } from "../../api/svUrlConstructs";
import axios from "axios";
import useAxiosDataFunction from "../../hooks/useAxiosDataFunction";
import CustomTable from "../../SamplePages/CustomTable";

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

  const [userListData, setUserListData] = useState([])

  
  useEffect(() => {
    if(userListingResponse?.data?.statuscode === 200){
        console.log(userListingResponse)
        setUserListData(userListingResponse?.data?.data?.docs)
    }
  }, [userListingResponse]);
  console.log(userListData)
  const headers = ['Name', 'Age', 'Email'];


  return (
    <Box m="20px">
      <Header title="Users " subtitle={"Manage Users List"} />
      {userListData.length >0 &&
        <CustomTable headers={headers} data={userListData}  />
      }
      
    </Box>
  );
};

export default UserListingPage;
