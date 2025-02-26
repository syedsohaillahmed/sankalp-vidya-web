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

const UserDetailPage = () => {
  const { id } = useParams();
  const accessToken = useSelector((state) => state.data.accessToken);
  const headersdata = useHeaders();
  console.log("headersdata", headersdata);

  // const fetchData = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/api/v1/users/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const { fetchData, response, error, loading } = useFetch();

  useEffect(() => {
    // fetchData(id);
    fetchData(
      `http://localhost:8000/api/v1/users/${id}`,
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
