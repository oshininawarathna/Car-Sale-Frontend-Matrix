import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { LoadingButton, LocalizationProvider, DatePicker } from '@mui/lab';
import Swal from 'sweetalert2';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { getVehicleInquiry, updateVehicleInquiry } from '../../services/VehicleInquiry';

import Page from '../../components/Page';
import VehicleInquiry from './VehicleInquiry';

const UpdateVehicleInquiry = () => {
  const [vehicleInquiryData, setVehicleInquiryData] = useState();
  const [loading, setLoading] = useState(true);

  // states
  const [fullName, setFullName] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [profession, setProfession] = useState();
  const [address, setAddress] = useState();
  const [cusreq, setCusReq] = useState();
  const [make, setMake] = useState();
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [payment, setPayment] = useState();
  const [insurance, setInsurance] = useState();
  const [remarks, setRemarks] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await updateVehicleInquiry(id, {
      name: `${fullName}`,
      contact: `${contact}`,
      email: `${email}`,
      profession: `${profession}`,
      address: `${address}`,
      cus_req: `${cusreq}`,
      make: `${make}`,
      brand: `${brand}`,
      model: `${model}`,
      payment: `${payment}`,
      insurance: `${insurance}`,
      remarks: `${remarks}`,
    });
    if (result) {
      navigate('/dashboard/inquiry');
    }
  };
  const fetchVehicleInquiry = async (id) => {
    const vehicleInquiry = await getVehicleInquiry(id);
    setVehicleInquiryData(vehicleInquiry.data);
    console.log(vehicleInquiry);

    setLoading(false);
  };
  useEffect(() => {
    fetchVehicleInquiry(id);
  }, []);

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
        navigate('/dashboard/inquiry');
      }
    });
  };
  // set initial data
  useEffect(() => {
    setFullName(vehicleInquiryData?.name);
    setContact(vehicleInquiryData?.contact);
    setEmail(vehicleInquiryData?.email);
    setProfession(vehicleInquiryData?.profession);
    setAddress(vehicleInquiryData?.address);
    setCusReq(vehicleInquiryData?.cus_req);
    setMake(vehicleInquiryData?.make);
    setBrand(vehicleInquiryData?.brand);
    setModel(vehicleInquiryData?.model);
    setPayment(vehicleInquiryData?.payment);
    setInsurance(vehicleInquiryData?.insurance);
    setRemarks(vehicleInquiryData?.remarks);
  }, [loading]);

  return (
    <Page title="Add Staff">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography sx={{ ml: 2 }} variant="h4" gutterBottom>
            Update Vehicle Inquiry
          </Typography>
          <IconButton component={RouterLink} to="/dashboard/inquiry">
            <Icon icon="ant-design:rollback-outlined" />
          </IconButton>
        </Stack>
        {loading ? (
          'loading...'
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  defaultValue={fullName}
                  type="text"
                  value={fullName}
                  label="Full Name"
                  onChange={(e) => setFullName(e.target.value)}
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
                <TextField
                  fullWidth
                  required
                  defaultValue={email}
                  type="email"
                  value={email}
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  defaultValue={profession}
                  type="text"
                  value={profession}
                  label="Profession"
                  onChange={(e) => setProfession(e.target.value)}
                />
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  defaultValue={address}
                  type="text"
                  value={address}
                  label="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Customer Req."
                    defaultValue={cusreq}
                    value={cusreq}
                    onChange={(newValue) => {
                      setCusReq(newValue);
                    }}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  defaultValue={make}
                  type="text"
                  value={make}
                  label="Make"
                  onChange={(e) => setMake(e.target.value)}
                />
              </Grid>

              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  defaultValue={brand}
                  type="text"
                  value={brand}
                  label="Brand"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  defaultValue={model}
                  type="text"
                  value={model}
                  label="Model"
                  onChange={(e) => setModel(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  defaultValue={payment}
                  type="text"
                  value={payment}
                  label="Payment"
                  onChange={(e) => setPayment(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  defaultValue={insurance}
                  type="text"
                  value={insurance}
                  label="Insurance"
                  onChange={(e) => setInsurance(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  required
                  defaultValue={remarks}
                  type="text"
                  value={remarks}
                  label="Remarks"
                  onChange={(e) => setRemarks(e.target.value)}
                />
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
        )}
      </Container>
    </Page>
  );
};

export default UpdateVehicleInquiry;
