import React, { useState } from 'react';
// import { Grid, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import {
  Stack,
  Grid,
  Container,
  TextField,
  Typography,
  IconButton,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,

  // LocalizationProvider,
} from '@mui/material';

import { Icon } from '@iconify/react';

import Swal from 'sweetalert2';

import axios from 'axios';
// material
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LoadingButton, LocalizationProvider, DatePicker } from '@mui/lab';
import Page from '../../components/Page';

const AddStaff = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNic] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [shift, setShift] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(Date.now());
  const [salary, setSalary] = useState('');
  const [file, setFile] = useState();

  const handleReset = (event) => {
    event.preventDefault();
    setFirstName('');
    setLastName('');
    setEmail('');
    setContact('');
    setAddress('');
    setGender('');
    setRole('');
    setShift('');
    setNic('');
    setDateOfBirth(Date.now());
    setSalary('');
    setFile('');
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const formData = new FormData();

    formData.append('first_name', `${firstName}`);
    formData.append('last_name', `${lastName}`);
    formData.append('ph_no', `${contact}`);
    formData.append('address', `${address}`);
    formData.append('nic', `${nic}`);
    formData.append('email', `${email}`);
    formData.append('gender', `${gender}`);
    formData.append('d_o_b', moment(dateOfBirth).format('YYYY-MM-DD'));
    formData.append('position', `${role}`);
    formData.append('shift', `${shift}`);
    formData.append('salary', `${salary}`);
    formData.append('image', file);

    axios
      .post('http://127.0.0.1:8000/api/staff', formData, config)
      .then((res) => {
        Swal.fire({
          title: 'Staff Added Successfully !',
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
        setGender('');
        setRole('');
        setShift('');
        setNic('');
        setDateOfBirth(Date.now());
        setSalary('');
        setFile('');
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
      <Page title="Add Staff">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography sx={{ ml: 2 }} variant="h4" gutterBottom>
              Add New Staff
            </Typography>
            <IconButton component={RouterLink} to="/dashboard/staff">
              <Icon icon="ant-design:rollback-outlined" />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  autoComplete=""
                  type="text"
                  value={firstName}
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  autoComplete=""
                  value={lastName}
                  type="text"
                  label="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>

              <Grid item xs={8.3} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  value={address}
                  autoComplete=""
                  type="text"
                  label="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  value={email}
                  autoComplete=""
                  type="email"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  value={nic}
                  autoComplete="nic"
                  inputProps={{ maxLength: 12 }}
                  type="text"
                  label="NIC"
                  onChange={(e) => setNic(e.target.value)}
                />
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  autoComplete=""
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  // type="number"
                  maxLength={4}
                  label="Contact No."
                  inputProps={{
                    maxLength: 10,
                  }}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date of birth  "
                    value={dateOfBirth}
                    onChange={(newValue) => {
                      setDateOfBirth(newValue);
                    }}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  autoComplete=""
                  label="Salary"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  inputProps={{
                    maxLength: 7,
                  }}
                  placeholder="lkr"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <FormControl fullWidth>
                  <InputLabel text="demo-simple-select-label">Role</InputLabel>
                  <Select
                    fullWidth
                    labeltext="demo-simple-select-label"
                    text="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value={'Manager'}>Manager</MenuItem>
                    <MenuItem value={'Seller'}>Seller</MenuItem>
                    <MenuItem value={'Reception'}>Reception</MenuItem>
                    <MenuItem value={'Security'}>Security</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <FormControl fullWidth>
                  <InputLabel text="demo-simple-select-label">Shift</InputLabel>
                  <Select
                    fullWidth
                    labeltext="demo-simple-select-label"
                    text="demo-simple-select"
                    value={shift}
                    label="Shift"
                    onChange={(e) => setShift(e.target.value)}
                  >
                    <MenuItem value={'FT'}>Full Time</MenuItem>
                    <MenuItem value={'PT'}>Part Time</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl style={{ marginLeft: 20 }}>
                  <FormLabel> Gender </FormLabel>
                  <RadioGroup row item xs={4} value={gender} onChange={(e) => setGender(e.target.value)}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={8} sx={{ m: 3 }}>
                <FormLabel>
                  <input type="file" onChange={handleChange} />
                </FormLabel>
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <LoadingButton style={{ width: 150 }} id="sub" size="large" type="submit" variant="contained">
                  Submit
                </LoadingButton>
                <LoadingButton style={{ width: 150, marginLeft: 10 }} size="large" type="reset" variant="outlined">
                  Reset
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Page>
    </>
  );
};

export default AddStaff;
