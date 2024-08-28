import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Link,
  Stack,
  Grid,
  Checkbox,
  Container,
  TextField,
  Typography,
  IconButton,
  FormControl,
  FormLabel,
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
import Page from '../../components/Page';
import { createVehicle } from '../../services/Vehicle';

const AddVehicle = () => {
  const [make, setMake] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [yearOfManufacture, setYearOfManufacture] = useState(Date.now());
  const [yearOfRegistration, setYearOfRegistration] = useState(Date.now());
  const [ownership, setOwnership] = useState('');
  const [chassisNo, setChassisNo] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [regNo, setRegNo] = useState('');
  const [mileAge, setMileAge] = useState('');
  const [remarks, setRemarks] = useState('');
  const [cost, setCost] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [margin, setMargin] = useState('');
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const handleReset = (event) => {
    event.preventDefault();
    setMake('');
    setBrand('');
    setModel('');
    setYearOfManufacture('');
    setYearOfRegistration('');
    setOwnership('');
    setChassisNo('');
    setFuelType('');
    setRegNo('');
    setMileAge('');
    setRemarks('');
    setCost('');
    setUnitPrice('');
    setMargin('');
    setFile('');
  };

  // Api bind

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    formData.append('make', `${make}`);
    formData.append('brand', `${brand}`);
    formData.append('model', `${model}`);
    formData.append('year_manufacture', `${yearOfManufacture.getFullYear()}`);
    formData.append('year_registration', `${yearOfRegistration.getFullYear()}`);
    formData.append('ownership', `${ownership}`);
    formData.append('chassis_no', `${chassisNo}`);
    formData.append('fuel_type', `${fuelType}`);
    formData.append('reg_no', `${regNo}`);
    formData.append('mileage', `${mileAge}`);
    formData.append('remarks', `${remarks}`);
    formData.append('cost', `${cost}`);
    formData.append('unit_price', `${unitPrice}`);
    formData.append('margin', `${margin}`);
    formData.append('trans_no', `1231`);
    formData.append('availability', `true`);
    formData.append('v_image', file);

    const result = await createVehicle(formData, config);

    if (result.statusText === 'OK') {
      Swal.fire({
        title: result?.data.message,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
      navigate('/dashboard/vehicle');
    }
  };

  return (
    <>
      <Page title="Dashboard: Blog">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Add New Vehicle
            </Typography>
            <IconButton component={RouterLink} to="/dashboard/vehicle">
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
              </Grid>
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
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Ownership</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ownership}
                    label="Ownership"
                    onChange={(e) => {
                      setOwnership(e.target.value);
                    }}
                  >
                    <MenuItem value={'First Owner'}>First Owner</MenuItem>
                    <MenuItem value={'Second Owner'}>Second Owner</MenuItem>
                    <MenuItem value={'Open Papers'}>Open Papers</MenuItem>
                    <MenuItem value={'Other'}> Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Year of Registration"
                    views={['year']}
                    value={yearOfRegistration}
                    onChange={(newValue) => {
                      setYearOfRegistration(newValue);
                    }}
                    renderInput={(params) => <TextField required fullWidth {...params} />}
                  />
                </LocalizationProvider>
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
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Fuel Type</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={fuelType}
                    label="Fuel Type"
                    onChange={(e) => {
                      setFuelType(e.target.value);
                    }}
                  >
                    <MenuItem value={'Diesel'}>Diesel</MenuItem>
                    <MenuItem value={'Petrol'}>Petrol</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  type="text"
                  required
                  label="Registration No"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Mileage:"
                  value={mileAge}
                  onChange={(e) => setMileAge(e.target.value)}
                />
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </Grid>
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
                <TextField
                  fullWidth
                  required
                  type="text"
                  label="Margin"
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid item xs={8.75} sx={{ m: 2 }}>
              <TextField
                style={{ width: 800 }}
                required
                type="text"
                label="Remarks"
                placeholder="Add your comment here"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sx={{ m: 3 }}>
              <FormLabel>
                <input type="file" onChange={handleChange} />
              </FormLabel>
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
export default AddVehicle;
