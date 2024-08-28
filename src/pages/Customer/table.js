import React, { useEffect, useState } from 'react';
import moment from 'moment';

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
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { getAllCustomer, deleteCustomer } from '../../services/Customer';
import LoadingLiner from '../../components/LoadingLiner';

const BasicTable = () => {
  const [customers, setCustomers] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const handleDelete = async (id, name) => {
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
          const deleted = deleteCustomer(id);
          Swal.fire(`${name}  Deleted!  `, 'Your file has been deleted.', 'success');
        }
        setTimeout(() => {
          setRefresh(refresh + 1);
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
    // const result = await deleteCustomer(id);
    // console.log('delete', result.data);
  };

  const fetchAllCustomer = async () => {
    const results = await getAllCustomer();
    setCustomers(results.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCustomer();
  }, [loading, refresh]);

  const rows = [];
  if (customers) {
    customers?.customer
      .slice()
      .reverse()
      .forEach((item) => {
        rows.push({
          id: item?.id,
          name: item?.name,
          contact: item?.contact,
          email: item?.email,
          address: item?.address,
          created_at: `${moment(item?.created_at).endOf('day').fromNow()}`,
        });
      });
  }

  if (loading) {
    return <LoadingLiner />;
  }

  return (
    <TableContainer component={Paper}>
      <Box style={{ maxHeight: '100vh' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow style={{ background: ' #ffebee' }}>
              <TableCell>Id</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.address}</TableCell>
                <IconButton
                  color="error"
                  onClick={() => {
                    handleDelete(row.id, row.name);
                  }}
                >
                  <Tooltip title="Delete">
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default BasicTable;
