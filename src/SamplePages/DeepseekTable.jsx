import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled components for custom design
export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '15px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

// Mock data
export const mockData = [
  { id: 1, name: 'John Doe', age: 28, city: 'New York', salary: '$75,000' },
  { id: 2, name: 'Jane Smith', age: 34, city: 'Los Angeles', salary: '$85,000' },
  { id: 3, name: 'Mike Johnson', age: 45, city: 'Chicago', salary: '$90,000' },
  { id: 4, name: 'Sara Wilson', age: 29, city: 'Houston', salary: '$80,000' },
  { id: 5, name: 'Chris Brown', age: 32, city: 'Phoenix', salary: '$78,000' },
];

const DeepseekTable = () => {
  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
        Employee Details
      </Typography>
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Salary</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {mockData.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.salary}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default DeepseekTable;