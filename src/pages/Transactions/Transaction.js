import React, { useEffect, useState } from 'react';
import {
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  IconButton,
  tableCellClasses,
  styled,
  Paper,
  TableHead,
  Tooltip,
  Button,
  Box,
  LinearProgress,
} from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PreviewIcon from '@mui/icons-material/Preview';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import LoadingLiner from '../../components/LoadingLiner';
import { getAllTransaction, deleteTransaction } from '../../services/Transaction';

const Transaction = () => {
  const [transactions, setTransaction] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setloading] = useState(true);

  // get all Transaction
  const fetchAllTransaction = async () => {
    try {
      const { data: allTransaction } = await getAllTransaction();
      setTransaction(allTransaction.posts);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // delete Transaction

  const deleteTransactions = (id, brand) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          const deleted = deleteTransaction(id, brand);
          Swal.fire(`${brand}  Deleted!  `, 'Your file has been deleted.', 'success');
          setTimeout(() => {
            setRefresh(refresh + 1);
          }, 1000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTransaction();
  }, [refresh]);

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

    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Page title="Transaction">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Transactions
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/add-transaction"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Transaction
          </Button>
        </Stack>
        {loading ? (
          <LoadingLiner />
        ) : (
          <TableContainer component={Paper}>
            <Box style={{ maxHeight: '100vh' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell> Brand</StyledTableCell>
                    <StyledTableCell>Model</StyledTableCell>
                    <Tooltip title="Year Manufacture">
                      <StyledTableCell>Year.Manu</StyledTableCell>
                    </Tooltip>
                    <Tooltip title="Year Registration">
                      <StyledTableCell>Year.Reg</StyledTableCell>
                    </Tooltip>
                    <StyledTableCell>ChassisNo</StyledTableCell>
                    <StyledTableCell>Query</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {transactions?.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.brand}
                      </StyledTableCell>
                      <StyledTableCell>{row.model}</StyledTableCell>
                      <StyledTableCell>{row.year_manufacture}</StyledTableCell>
                      <StyledTableCell>{row.year_registration}</StyledTableCell>
                      <StyledTableCell>{row.chassis_no}</StyledTableCell>
                      <StyledTableCell>{row.query}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          color="error"
                          onClick={() => {
                            deleteTransactions(row.id, row.brand);
                          }}
                        >
                          <Tooltip title="Delete">
                            <DeleteIcon />
                          </Tooltip>
                        </IconButton>
                        <IconButton component={RouterLink} to={`/dashboard/add-customer-form/${row.id}`}>
                          <Tooltip title="Add Customer">
                            <AddBoxIcon />
                          </Tooltip>
                        </IconButton>
                        <Tooltip title="View Transaction">
                          <IconButton component={RouterLink} to={`/dashboard/view-transaction/${row.id}`}>
                            <PreviewIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>{' '}
            </Box>
          </TableContainer>
        )}
      </Container>
    </Page>
  );
};

export default Transaction;
