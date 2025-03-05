import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllChapterUC } from "../../../../../api/svUrlConstructs";
import useAxiosDataFunction from "../../../../../hooks/useAxiosDataFunction";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "../../../../../SamplePages/DeepseekTable";
import ListLoader from "../../../../../components/loader/ListLoader";
import CreateChapter from "../forms/CreateChapter";
import { useNavigate } from "react-router-dom";

const AdminAllChapters = () => {
  const accessToken = useSelector((state) => state?.data?.accessToken);
  const [chapterData, setChapterData] = useState([]);
  const [
    allChapterResponse,
    allChapterError,
    allChapterIsLoading,
    fetchAllChapter,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const getAllChapter = () => {
    fetchAllChapter({
      axiosInstance: axios,
      method: "get",
      url: getAllChapterUC(),
      token: accessToken,
    });
  };

  useEffect(() => {
    getAllChapter();
  }, []);

  useEffect(() => {
    if (allChapterResponse?.data?.statuscode === 200) {
      console.log("coming inside", allChapterResponse?.data?.data);
      setChapterData(allChapterResponse?.data?.data);
    }
  }, [allChapterResponse]);

  const navigate = useNavigate();

  const handleChapterRowClick = (row) => {
    navigate(`/admin/chapters/${row.id}`);
  };

  return (
    <>
      <Box sx={{ paddingBottom: "2rem" }} justifySelf={"flex-end"}>
        <CreateChapter />
      </Box>
      <Box>
        {allChapterIsLoading && <ListLoader />}
        {!allChapterIsLoading && allChapterError && <div> Error occured</div>}
        {!allChapterIsLoading &&
          !allChapterError &&
          chapterData?.length > 0 && (
            <Box sx={{ paddingBottom: "2rem" }}>
              <StyledTableContainer component={Paper}>
                <Table>
                  <StyledTableHead>
                    <TableRow>
                      <StyledTableCell>Index</StyledTableCell>
                      <StyledTableCell>chapter name</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Class</StyledTableCell>
                      <StyledTableCell>Subject</StyledTableCell>
                      <StyledTableCell>Notes uploaded</StyledTableCell>
                      <StyledTableCell>video uploaded</StyledTableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {chapterData.length > 0 &&
                      chapterData?.map((row, index) => {
                        return (
                          <StyledTableRow
                            onClick={() => handleChapterRowClick(row)}
                            key={row.id}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row?.name}</TableCell>
                            <TableCell>{row?.description}</TableCell>
                            <TableCell>{row?.class?.name || ""}</TableCell>
                            <TableCell>{row?.subject?.displayName}</TableCell>
                            <TableCell>{"true/false"}</TableCell>
                            <TableCell>{"true/false"}</TableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Box>
          )}
      </Box>
    </>
  );
};

export default AdminAllChapters;
