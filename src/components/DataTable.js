import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const rows = [
  {
    name: 'hello',
    calories: 'duhgfisudhgy',
    fat: 'sdgfjhsg',
    carbs: 'fsjdhf',
  },
  {
    name: 'hello',
    calories: 'duhgfisudhgy',
    fat: 'sdgfjhsg',
    carbs: 'fsjdhf',
  },
  {
    name: 'hello',
    calories: 'duhgfisudhgy',
    fat: 'sdgfjhsg',
    carbs: 'fsjdhf',
  },
];

const columns = [
  { id: 1, name: 'first name' },
  { id: 2, name: 'last name' },
  { id: 3, name: 'no' },
  { id: 4, name: 'sash' },
  { id: 5, name: 'love' },
];

const rowsNames = [
  { id: 1, v: 'hhh' },
  { id: 2, v: 'aaa' },
  { id: 3, v: 'ccc' },
  { id: 4, v: 'mmm' },
  { id: 5, v: 'jdfhgk' },
];

export default function DataTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((colum) => (
              <StyledTableCell>{colum.name}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              {rowsNames.map((n) => (
                <StyledTableCell>{n.v}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
