import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';
import { Card, Stack, Button, Container, Typography, IconButton, Box, Grid, CardContent } from '@mui/material';
import { Icon } from '@iconify/react';
import Page from '../../components/Page';
import LoadingLiner from '../../components/LoadingLiner';
import useFetch from '../../hooks/useFetch';

const ViewSwapDeal = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: swapData, isLoading } = useFetch(`http://127.0.0.1:8000/api/swapvehicle/${id}`);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contacts, setContact] = useState('');
  const [profession, setProfession] = useState('');
  const [address, setAddress] = useState('');
  const [cusMake, setCusMake] = useState('');
  const [cusBrand, setCusBrand] = useState('');
  const [cusModel, setCusModel] = useState('');
  const [cusYearManufacture, setCusYearManufacture] = useState('');
  const [yearRegistration, setYearRegistration] = useState('');
  const [cusOwnership, setCusOwnership] = useState('');
  const [chassisNo, setChassisNo] = useState('');
  const [cusFuelType, setCusFuelType] = useState('');
  const [mileage, setMileage] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [make, setMake] = useState('');
  const [ownership, setOwnership] = useState('');
  const [yearManufacture, setYearManufacture] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
    setName(swapData?.name);
    setEmail(swapData?.email);
    setContact(swapData?.contact);
    setProfession(swapData?.profession);
    setAddress(swapData?.address);
    setCusMake(swapData?.cus_make);
    setCusBrand(swapData?.cus_brand);
    setCusModel(swapData?.cus_model);
    setCusYearManufacture(swapData?.cus_year_manufacture);
    setYearRegistration(swapData?.year_registration);
    setCusOwnership(swapData?.cus_ownership);
    setChassisNo(swapData?.chassis_no);
    setCusFuelType(swapData?.cus_fuel_type);
    setMileage(swapData?.mileage);
    setRemark(swapData?.remarks);
    setBrand(swapData?.brand);
    setModel(swapData?.model);
    setMake(swapData?.make);
    setOwnership(swapData?.ownership);
    setYearManufacture(swapData?.year_manufacture);
    setFuelType(swapData?.fuel_type);
  }, [isLoading, swapData]);

  const removeSwap = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Decline',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/api/swapvehicle/${id}`)
          .then(Swal.fire(`Swap deal declined !  `, 'swap deal removed', 'success'));
      }
      navigate('/dashboard/swap');
    });
  };

  const swapAccept = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Accepted it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://127.0.0.1:8000/api/swapvehicle/${id}`, {
            name: `${name}`,
            contact: `${contacts}`,
            email: `${email}`,
            profession: `${profession}`,
            address: `${address}`,
            cus_make: `${cusMake}`,
            cus_brand: `${cusBrand}`,
            cus_model: `${cusModel}`,
            cus_year_manufacture: `${cusYearManufacture}`,
            year_registration: `${yearRegistration}`,
            cus_ownership: `${cusOwnership}`,
            chassis_no: `${chassisNo}`,
            cus_fuel_type: `${cusFuelType}`,
            mileage: `${mileage}`,
            remarks: `${remark}`,
            brand: `${brand}`,
            model: `${model}`,
            make: `${make}`,
            ownership: `${ownership}`,
            year_manufacture: `${yearManufacture}`,
            fuel_type: `${fuelType}`,
            decision: 1,
          })
          .then((res) => {
            Swal.fire({
              title: 'Swap Deal Accepted !',
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            });
            navigate('/dashboard/swap');
          })
          .catch((e) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e.response.data.message,
            });
          });
      }
    });
  };

  return (
    <>
      <Page title=" View SwapDeal">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              View Swap Deal
            </Typography>

            <IconButton component={RouterLink} to="/dashboard/swap">
              <Icon icon="ant-design:rollback-outlined" />
            </IconButton>
          </Stack>
          {isLoading ? (
            <LoadingLiner />
          ) : (
            <Grid container>
              <Grid item sx={{ m: 2 }}>
                <Card sx={{ display: 'flex', height: '1000px', width: '550px' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <h3 style={{ marginLeft: '170px', marginBottom: '20px' }}> Personal</h3>
                      <Grid container>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Name :
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.name}
                            </Typography>{' '}
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Contact :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.contact}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Email :
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.email}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Address :
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.address}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Profession :
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.profession}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Customer Make :
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.cus_make}
                            </Typography>{' '}
                          </Stack>
                        </Grid>{' '}
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Customer Brand :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.cus_brand}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Customer Model :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.cus_model}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Customer year Manufacture :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.cus_year_manufacture}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Year Registration :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.year_registration}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Customer Ownership :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.cus_ownership}
                            </Typography>
                          </Stack>
                        </Grid>{' '}
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Chassis No :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.chassis_no}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Fuel Type :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.cus_fuel_type}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Mileage :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.mileage}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Remark :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.remarks}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
              <Grid item sx={{ m: 2 }}>
                <Card sx={{ display: 'flex', height: '500px', width: '520px' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <h3 style={{ marginLeft: '170px', marginBottom: '20px' }}> Expecting</h3>
                      <Grid container sx={{ marginLeft: '50px' }}>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Brand :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.brand}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Model :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.model}
                            </Typography>
                          </Stack>
                        </Grid>{' '}
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Make :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.make}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Ownership :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.ownership}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Year Manufacture :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.year_manufacture}
                            </Typography>
                          </Stack>
                        </Grid>{' '}
                        <Grid item sx={{ m: 2 }} xs={12}>
                          <Stack direction="row">
                            <Typography component="div" variant="h6">
                              Fuel Type :
                            </Typography>
                            <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                              {swapData?.fuel_type}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>{' '}
                    </CardContent>
                  </Box>
                </Card>
                {console.log(swapData?.decision)}
                <Grid item sx={{ m: 4 }} style={{ padding: '2px' }}>
                  {swapData?.decision === 1 ? (
                    <Button
                      disabled
                      onClick={() => {
                        swapAccept(id);
                      }}
                      variant="outlined"
                      color="success"
                      sx={{ margin: '10px' }}
                    >
                      Accept
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        swapAccept(id);
                      }}
                      variant="outlined"
                      color="success"
                      sx={{ margin: '10px' }}
                    >
                      Accept
                    </Button>
                  )}

                  <Button
                    onClick={() => {
                      removeSwap(id);
                    }}
                    variant="outlined"
                    color="error"
                    sx={{ margin: '10px' }}
                  >
                    Decline
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Container>
      </Page>
    </>
  );
};

export default ViewSwapDeal;
