import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import useAxiosFunction from "../../hooks/useAxiosFunction";
// import axios from "../../api/axiosHeaders";
import { useSelector } from "react-redux";
import { useHeaders } from "../../api/headers";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { getUserDetailsByIdUC } from "../../api/svUrlConstructs";

const UserDetailPage = () => {
  const { id } = useParams();
  const accessToken = useSelector((state) => state.data.accessToken);

  const { fetchData, response, error, loading } = useFetch();

  const url = getUserDetailsByIdUC(id);

  useEffect(() => {
    fetchData(
      getUserDetailsByIdUC(id),
      "GET",
      null,
      accessToken
    );
  }, []);

  useEffect(() => {
    console.log("response", response, error, loading);
  }, [response, error, loading]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="User Detail Page" />
      </Box>
    </Box>
  );
};

export default UserDetailPage;
