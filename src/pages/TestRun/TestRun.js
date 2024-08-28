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
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// components
import Page from '../../components/Page';

import LoadingLiner from '../../components/LoadingLiner';
import DataTable from '../../components/DataTable';
import { getAllTestRun, removeTestRun } from '../../services/TestRun';
// mock
// import rows from '../../_mock/user';

// ----------------------------------------------------------------------

export default function TestRun() {
  const [testRun, setTestRun] = useState([]);
  const [loading, setloading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  // get all TestRun
  const fetchAllTestRun = async () => {
    try {
      const { data: allTestRun } = await getAllTestRun();
      setTestRun(allTestRun.posts);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTestrun = (id, name) => {
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
          const deleted = removeTestRun(id);
          Swal.fire(`${name}  Deleted!  `, 'Your file has been deleted.', 'success');
        }
        setTimeout(() => {
          setRefresh(refresh + 1);
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllTestRun();
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
    <Page title="TestDrive">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Test Drive
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
                    <StyledTableCell> Name</StyledTableCell>
                    <StyledTableCell>Brand</StyledTableCell>
                    <StyledTableCell>Model</StyledTableCell>
                    <Tooltip title="Year Of Manufacture">
                      <StyledTableCell>YOM</StyledTableCell>
                    </Tooltip>
                    <Tooltip title="Customer Request Date and Time">
                      <StyledTableCell>Cus.Req DT</StyledTableCell>
                    </Tooltip>

                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testRun?.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.brand}</StyledTableCell>
                      <StyledTableCell>{row.model}</StyledTableCell>
                      <StyledTableCell>{row.year_manufacture}</StyledTableCell>
                      <StyledTableCell>{row.cus_req}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton component={RouterLink} to={`/dashboard/view-test-run/${row.id}`}>
                          <PreviewIcon />
                        </IconButton>{' '}
                        <IconButton component={RouterLink} to={`/dashboard/update-test-run/${row.id}`}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            deleteTestrun(row.id, row.name);
                          }}
                        >
                          <Tooltip title="Delete">
                            <DeleteIcon />
                          </Tooltip>
                        </IconButton>
                        {/* </IconButton> */}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>{' '}
            </Box>
          )}
        </TableContainer>
      </Container>
    </Page>
  );
}
