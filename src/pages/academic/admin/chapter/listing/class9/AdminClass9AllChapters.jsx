import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllChapterUC } from "../../../../../../api/svUrlConstructs";
import useAxiosDataFunction from "../../../../../../hooks/useAxiosDataFunction";
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
} from "../../../../../../SamplePages/DeepseekTable";
import ListLoader from "../../../../../../components/loader/ListLoader";
import CreateChapter from "../../forms/CreateChapter";
import { useNavigate } from "react-router-dom";
import ChapterTable from "../../component/ChapterTable";
import { useContext } from "react";
import { ChpterContext } from "./AdminClass9ChapterTab";

const AdminClass9AllChapters = () => {
  const accessToken = useSelector((state) => state?.data?.accessToken);
  const [chapterData, setChapterData] = useState([]);
  const {
    createchapterResponse,
    createchapterError,
    createchapterIsLoading,
    putVideoData,
  } = useContext(ChpterContext);
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
    if (createchapterResponse?.data?.statuscode === 201) {
      getAllChapter();
    }
  }, [createchapterResponse]);

  useEffect(() => {
    if (allChapterResponse?.data?.statuscode === 200) {
      setChapterData(allChapterResponse?.data?.data);
    }
  }, [allChapterResponse]);

  const navigate = useNavigate();

  const handleChapterRowClick = (row) => {
    navigate(`/admin/chapters/${row._id}`);
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
              <ChapterTable
                allChapterError={allChapterError}
                allChapterIsLoading={allChapterIsLoading}
                chapterData={chapterData}
                handleChapterRowClick={handleChapterRowClick}
              />
            </Box>
          )}
      </Box>
    </>
  );
};

export default AdminClass9AllChapters;
