import { Box, IconButton, Paper, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableContainer, StyledTableHead, StyledTableRow } from "../../../../../SamplePages/DeepseekTable";
import ListLoader from "../../../../../components/loader/ListLoader";
import { DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import ConfirmationDialog from "../../../../../components/dialog/ConfirmationDialog";
import { useContext } from "react";
import { ChpterContext } from "../listing/class9/AdminClass9ChapterTab";

const ChapterTable = ({allChapterIsLoading, allChapterError, chapterData=[], handleChapterRowClick}) => {

const {removeChapter} = useContext(ChpterContext)
  const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
  
  
  
    const handleClose = () => {
      setSelectedRow(null)
      setOpen(false);
    };
  
    const handleDeleteClick = (row) => {
      setSelectedRow(row);
      setOpen(true);
    };

    const handleDeleteStudent = () => {
      if(selectedRow){
        removeChapter(selectedRow._id)
        handleClose()
      }
    };
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
                      <StyledTableCell>Delete</StyledTableCell>
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
      </Box>
      <ConfirmationDialog
        open={open}
        dialogTitle={"Delete Chapter"}
        dialogContentText={`Are you sure you want to delete ${selectedRow?.name}?`}
        handleClose={handleClose}
        handleConfirm={handleDeleteStudent}
      />
    </>
  );
};

export default ChapterTable;
