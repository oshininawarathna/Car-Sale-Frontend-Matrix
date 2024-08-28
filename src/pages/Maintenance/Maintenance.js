import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { sample, filter } from 'lodash';
import { faker } from '@faker-js/faker';
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
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
// components
import { getAllMaintenance, removeMaintenance } from '../../services/Maintenance';
import Page from '../../components/Page';
import LoadingLiner from '../../components/LoadingLiner';

// mock
// import rows from '../../_mock/user';

// ----------------------------------------------------------------------

export default function ViewMaintenance() {
  const [maintenance, setMaintenance] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setloading] = useState(true);

  // get all Maintenance
  const fetchAllMaintenance = async () => {
    try {
      const { data: allMaintenance } = await getAllMaintenance();
      setMaintenance(allMaintenance.posts);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMaintenance = (id, brand) => {
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
          const deleted = removeMaintenance(id);
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
    fetchAllMaintenance();
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
    <Page title="Maintenance">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Maintenances
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
                    <StyledTableCell> Vehicle Id</StyledTableCell>
                    <StyledTableCell>Brand</StyledTableCell>
                    <StyledTableCell>Chassis No</StyledTableCell>
                    <StyledTableCell>Model</StyledTableCell>
                    <StyledTableCell>Cost</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {maintenance.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.vehicleid}
                      </StyledTableCell>
                      <StyledTableCell>{row.brand}</StyledTableCell>
                      <StyledTableCell>{row.chassis_no}</StyledTableCell>
                      <StyledTableCell>{row.model}</StyledTableCell>
                      <StyledTableCell>{row.cost}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton component={RouterLink} to={`/dashboard/View-Maintenance/${row.id}`}>
                          <Tooltip title="View">
                            <PreviewIcon />
                          </Tooltip>
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            deleteMaintenance(row.id, row.brand);
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
              </Table>{' '}
            </Box>
          )}
        </TableContainer>
      </Container>
    </Page>
  );
}
