import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TablePagination,
} from '@mui/material';

const SVTable = ({ headers, data, title }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice data for pagination
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
        {title}
      </Typography>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: '8px', boxShadow: 3 }}>
        <TableContainer sx={{ maxHeight: 440, borderRadius: '8px' }}>
          <Table stickyHeader aria-label="custom table">
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex} hover>
                  {Object.values(row).map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      sx={{
                        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                        fontSize: '0.875rem',
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: '1px solid rgba(224, 224, 224, 0.5)' }}
        />
      </Paper>
    </Box>
  );
};

export default SVTable;