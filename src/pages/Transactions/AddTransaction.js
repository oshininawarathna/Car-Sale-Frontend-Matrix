import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Stack,
  Grid,
  Container,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Swal from 'sweetalert2';
import axios from 'axios';
import { Icon } from '@iconify/react';
// material
import { LoadingButton, DatePicker } from '@mui/lab';

import { createTransaction } from '../../services/Transaction';
import Page from '../../components/Page';

const AddTransaction = () => {
  const [make, setMake] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [yearOfManufacture, setYearOfManufacture] = useState(Date.now());
  const [yearOfRegistration, setYearOfRegistration] = useState();
  const [chassisNo, setChassisNo] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [query, setQuery] = useState('');

  const handleReset = (event) => {
    event.preventDefault();
    setMake('');
    setBrand('');
    setModel('');
    setYearOfManufacture(Date.now());
    setYearOfRegistration(Date.now());
    setChassisNo('');
    setUnitPrice('');
    setQuery('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await createTransaction({
      make: `${make}`,
      brand: `${brand}`,
      model: `${model}`,
      year_manufacture: `${yearOfManufacture.getFullYear()}`,
      year_registration: `${yearOfRegistration}`,
      chassis_no: `${chassisNo}`,
      unit_price: `${unitPrice}`,
      query: `${query}`,
    });

    if (result.data.status) {
      Swal.fire({
        title: 'New Transaction added sucessfully !',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
    }
  };
  return (
    <>
      <Page title="Add Transaction">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Add Transaction
            </Typography>
            <IconButton component={RouterLink} to="/dashboard/transaction">
              <Icon icon="ant-design:rollback-outlined" />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container>
              <Grid item xs={4} sx={{ m: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Make</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={make}
                    label="Make"
                    onChange={(e) => {
                      setMake(e.target.value);
                    }}
                  >
                    <MenuItem value={'Car'}>Car</MenuItem>
                    <MenuItem value={'Jeep'}>Jeep</MenuItem>
                    <MenuItem value={'Van'}>Van</MenuItem>
                  </Select>
                </FormControl>
              </Grid>{' '}
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  type="text"
                  label="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  type="text"
                  label="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </Grid>{' '}
              <Grid item xs={4} sx={{ m: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Year of make"
                    views={['year']}
                    value={yearOfManufacture}
                    onChange={(newValue) => {
                      setYearOfManufacture(newValue);
                    }}
                    renderInput={(params) => <TextField required fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  type="text"
                  label="Year of Registration"
                  value={yearOfRegistration}
                  onChange={(e) => setYearOfRegistration(e.target.value)}
                />
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Year of Registration"
                    views={['year']}
                    value={yearOfRegistration}
                    onChange={(newValue) => {
                      setYearOfRegistration(newValue);
                    }}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider> */}
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  type="text"
                  required
                  label="Chasis No"
                  value={chassisNo}
                  onChange={(e) => setChassisNo(e.target.value)}
                />
              </Grid>{' '}
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Unit Price"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Query</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={query}
                    label="Query"
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                  >
                    <MenuItem value={'Sold'}>Sold</MenuItem>
                    <MenuItem value={'bought'}>Bought</MenuItem>
                  </Select>
                </FormControl>
              </Grid>{' '}
            </Grid>
            <Grid item xs={5} sx={{ m: 2 }}>
              <LoadingButton style={{ width: 150 }} size="large" type="submit" variant="contained">
                Submit
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

export default AddTransaction;
