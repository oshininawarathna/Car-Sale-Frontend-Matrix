import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
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
  Box,
} from '@mui/material';

import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import Label from '../../components/Label';
import { getAllSwapVehicle, deleteSwap } from '../../services/Swap';
// components
import Page from '../../components/Page';
import LoadingLiner from '../../components/LoadingLiner';

// mock
// import rows from '../../_mock/user';

// ----------------------------------------------------------------------

export default function SwapDeal() {
  const [swapVehicle, setSwapVehicle] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setloading] = useState(true);

  // get all SwapVehicle
  const fetchAllSwapVehicle = async () => {
    try {
      const { data: allSwapVehicle } = await getAllSwapVehicle();
      setSwapVehicle(allSwapVehicle.posts);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSwaps = (id, name) => {
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
          const deleted = deleteSwap(id, name);
          Swal.fire(`${name}  Deleted!  `, 'Your file has been deleted.', 'success');
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
    fetchAllSwapVehicle();
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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // ----------------------------------------------------------------------

  return (
    <Page title="SwapDeal">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            SwapDeal
          </Typography>
        </Stack>
        <TableContainer component={Paper}>
          {loading ? (
            <LoadingLiner />
          ) : (
            <Box style={{ maxHeight: '100vh' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Full Name</StyledTableCell>
                    <Tooltip title="Custom Model">
                      <StyledTableCell>Cus. Model</StyledTableCell>
                    </Tooltip>
                    <Tooltip title="Request Model">
                      <StyledTableCell>Req. Model</StyledTableCell>
                    </Tooltip>
                    <Tooltip title="Custom Year Of Manufacture">
                      <StyledTableCell>Cus. YOM</StyledTableCell>
                    </Tooltip>
                    <Tooltip title="Requested Year Of Manufacture">
                      <StyledTableCell>Req. YOM</StyledTableCell>
                    </Tooltip>
                    <StyledTableCell>Contact</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {swapVehicle.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.cus_model}</StyledTableCell>
                      <StyledTableCell>{row.model}</StyledTableCell>
                      <StyledTableCell>{row.cus_year_manufacture}</StyledTableCell>
                      <StyledTableCell>{row.year_manufacture}</StyledTableCell>
                      <StyledTableCell>{row.contact}</StyledTableCell>
                      <StyledTableCell>
                        <Label variant="ghost">{row.decision === 1 ? 'Accepted' : 'Pending'}</Label>
                        {console.log(row.decision)}
                      </StyledTableCell>

                      <StyledTableCell>
                        <IconButton component={RouterLink} to={`/dashboard/view-swap-deal/${row.id}`}>
                          <PreviewIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            deleteSwaps(row.id, row.name);
                          }}
                        >
                          <Tooltip title="Delete">
                            <DeleteIcon />
                          </Tooltip>
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </TableContainer>
      </Container>
    </Page>
  );
}
