import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Link, Stack, Grid, Checkbox, Container, TextField, Typography, IconButton } from '@mui/material';
import Swal from 'sweetalert2';

import axios from 'axios';
import { Icon } from '@iconify/react';
// material
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';

const CustomerForm = () => {
  const { id } = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const handleReset = (event) => {
    event.preventDefault();
    setFirstName('');
    setLastName('');
    setEmail('');
    setContact('');
    setAddress('');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/customers', {
        name: `${firstName} ${lastName}`,
        contact: `${contact}`,
        address: `${address}`,
        email: `${email}`,
        transid: `${id}`,
      })
      .then((res) => {
        Swal.fire({
          title: 'New customer added sucessfully !',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });

        setFirstName('');
        setLastName('');
        setEmail('');
        setContact('');
        setAddress('');
      })
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.response.data.message,
        });
      });
  };

  return (
    <>
      <Page title="Customer">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Add New Customer
            </Typography>
            <IconButton component={RouterLink} to="/dashboard/add-customer">
              <Icon icon="ant-design:rollback-outlined" />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  type="text"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  type="text"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>{' '}
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  label="Contact No."
                  inputProps={{
                    maxLength: 10,
                  }}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Grid>{' '}
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={8.35} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  type="text"
                  required
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={5} sx={{ m: 2 }}>
              <LoadingButton style={{ width: 150 }} size="large" type="submit" variant="contained">
                Create
              </LoadingButton>
              <LoadingButton style={{ width: 150, marginLeft: 10 }} size="large" type="reset" variant="outlined">
                Reset
              </LoadingButton>
            </Grid>
          </form>
        </Container>
      </Page>
    </>
  );
};

export default CustomerForm;
