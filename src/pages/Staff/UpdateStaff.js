import React, { useEffect, useState } from 'react';

import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  Link,
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
} from '@mui/material';

import { Icon } from '@iconify/react';

import Swal from 'sweetalert2';

import axios from 'axios';

// material
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LoadingButton, LocalizationProvider, DatePicker } from '@mui/lab';
import Page from '../../components/Page';
import useFetch from '../../hooks/useFetch';

const UpdateStaff = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetch(`http://127.0.0.1:8000/api/staff/${id}`);
  const navigate = useNavigate();
  useEffect(() => {
    setFirstName(data?.first_name);
    setLastName(data?.last_name);
    setAddress(data?.address);
    setEmail(data?.email);
    setNic(data?.nic);
    setContact(data?.ph_no);
    setDateOfBirth(data?.d_o_b);
    setSalary(data?.salary);
    setRole(data?.position);
    setShift(data?.shift);
    setGender(data?.gender);
  }, [data]);

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

  const handleCancel = (event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/dashboard/staff');
      }
    });
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

    axios
      .put(`http://127.0.0.1:8000/api/staff/${id}`, {
        first_name: `${firstName}`,
        last_name: `${lastName}`,
        ph_no: `${contact}`,
        address: `${address}`,
        nic: `${nic}`,
        email: `${email}`,
        gender: `${gender}`,
        d_o_b: `${moment(dateOfBirth).format('YYYY-MM-DD')}`,
        position: `${role}`,
        shift: `${shift}`,
        salary: `${salary}`,
        margin: `${file}`,
      })

      .then((res) => {
        Swal.fire({
          title: 'Staff Updated Successfully !',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
        navigate('/dashboard/staff');
      })
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.response.data.message,
        });
      });

    // setFirstName('');
    // setLastName('');
    // setEmail('');
    // setContact('');
    // setAddress('');
    // setGender('');
    // setRole('');
    // setShift('');
    // setNic('');
    // setDateOfBirth(Date.now());
    // setSalary('');
    // setFile('');
  };

  if (isLoading) {
    return <>loading...</>;
  }
  return (
    <>
      <Page title="Add Staff">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography sx={{ ml: 2 }} variant="h4" gutterBottom>
              Update {data?.first_name} {data?.last_name}
            </Typography>
            <IconButton component={RouterLink} to="/dashboard/staff">
              <Icon icon="ant-design:rollback-outlined" />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  defaultValue={data?.first_name}
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
                  defaultValue={data?.last_name}
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
                  defaultValue={data?.address}
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
                  defaultValue={data?.email}
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
                  defaultValue={data?.nic}
                  autoComplete="nic"
                  type="text"
                  label="NIC"
                  inputProps={{ maxLength: 12 }}
                  onChange={(e) => setNic(e.target.value)}
                />
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  autoComplete=""
                  defaultValue={data?.ph_no}
                  label="Contact No."
                  value={contact}
                  inputProps={{ maxLength: 10 }}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date of birth  "
                    defaultValue={data?.d_o_b}
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
                  type="number"
                  label="Salary"
                  defaultValue={data?.salary}
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
                    defaultValue={data?.position}
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
                    defaultValue={data?.shift}
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
                  <RadioGroup
                    defaultValue={data?.gender}
                    row
                    item
                    xs={4}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
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
                  Save
                </LoadingButton>
                <LoadingButton
                  style={{ width: 150, marginLeft: 10 }}
                  size="large"
                  onClick={handleCancel}
                  variant="outlined"
                >
                  Cancel
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Page>
    </>
  );
};

export default UpdateStaff;
