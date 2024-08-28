import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Page from '../../components/Page';

import LoadingLiner from '../../components/LoadingLiner';
import { getAllVehicleInquiry, removeVehicleInquiry } from '../../services/VehicleInquiry';

export default function VehicleInquiry() {
  const [vehicleInquiry, setVehicleInquiry] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setloading] = useState(true);

  // get all Transaction
  const fetchAllVehicleInquiry = async () => {
    try {
      const { data: allVehicleInquiry } = await getAllVehicleInquiry();
      setVehicleInquiry(allVehicleInquiry.posts);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteVehicleInquiry = (id, name) => {
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
          const deleted = removeVehicleInquiry(id);
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
    fetchAllVehicleInquiry();
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
    <Page title="VehicleInquiry">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Vehicle Inquiry
          </Typography>
        </Stack>
        <TableContainer component={Paper}>
          {' '}
          {loading ? (
            <LoadingLiner />
          ) : (
            <Box style={{ maxHeight: '100vh' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell> Name</StyledTableCell>
                    <StyledTableCell>Contact</StyledTableCell>
                    <StyledTableCell>Brand</StyledTableCell>
                    <StyledTableCell>Model</StyledTableCell>
                    <Tooltip title="Custom Request">
                      <StyledTableCell>Cus.Req</StyledTableCell>
                    </Tooltip>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicleInquiry.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.contact}</StyledTableCell>
                      <StyledTableCell>{row.brand}</StyledTableCell>
                      <StyledTableCell>{row.model}</StyledTableCell>
                      <StyledTableCell>{row.cus_req}</StyledTableCell>

                      <StyledTableCell>
                        <IconButton component={RouterLink} to={`/dashboard/view-vehicle-inquiry/${row.id}`}>
                          <PreviewIcon />
                        </IconButton>{' '}
                        <IconButton component={RouterLink} to={`/dashboard/update-vehicle-inquiry/${row.id}`}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            deleteVehicleInquiry(row.id, row.name);
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
