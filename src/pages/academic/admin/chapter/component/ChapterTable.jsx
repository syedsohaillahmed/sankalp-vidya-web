import { Box, Paper, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableContainer, StyledTableHead, StyledTableRow } from "../../../../../SamplePages/DeepseekTable";
import ListLoader from "../../../../../components/loader/ListLoader";

const ChapterTable = ({allChapterIsLoading, allChapterError, chapterData=[], handleChapterRowClick}) => {
  return (
    <>
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

export default ChapterTable;
