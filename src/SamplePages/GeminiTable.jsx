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
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const data = [
  { id: 1, name: 'Eleanor Pena', email: 'eleanor.pena@example.com', role: 'Manager', status: 'Active' },
  { id: 2, name: 'Jenny Wilson', email: 'jenny.wilson@example.com', role: 'Developer', status: 'Inactive' },
  { id: 3, name: 'Robert Fox', email: 'robert.fox@example.com', role: 'Designer', status: 'Active' },
  { id: 4, name: 'Jacob Jones', email: 'jacob.jones@example.com', role: 'Analyst', status: 'Pending' },
  { id: 5, name: 'Wade Warren', email: 'wade.warren@example.com', role: 'Support', status: 'Active' },
];

function GeminiTable() {
  return (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom sx={{paddingBottom:'20px'}}>
        User Information
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' }}>
        <Table aria-label="classy table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Role</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.role}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GeminiTable;