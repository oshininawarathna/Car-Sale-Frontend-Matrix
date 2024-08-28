import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  IconButton,
  Box,
  Grid,
  CardContent,
  Skeleton,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Icon } from '@iconify/react';
import Page from '../../components/Page';

import { getVehicleInquiry } from '../../services/VehicleInquiry';

const ViewVehicleInquiry = () => {
  const { id } = useParams();
  const [vehicleInquiry, setVehicleInquiry] = useState([]);
  const [loading, setLoading] = useState(true);

  // featching data
  const getVehicleInquiryData = async (id) => {
    const result = await getVehicleInquiry(id);
    setVehicleInquiry(result?.data);
    setLoading(false);
  };
  useEffect(() => {
    getVehicleInquiryData(id);
  }, []);

  if (loading) {
    return (
      <>
        <Stack spacing={1} sx={{ marginTop: '130px', marginLeft: '230px' }}>
          <Skeleton style={{ borderRadius: 18 }} variant="rectangular" width={700} height={870} />
        </Stack>
      </>
    );
  }
  return (
    <>
      <Page title=" View VehicleInquiry">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              View Vehicle Inquiry
            </Typography>

            <IconButton component={RouterLink} to="/dashboard/inquiry">
              <Icon icon="ant-design:rollback-outlined" />
            </IconButton>
          </Stack>

          <Card sx={{ display: 'flex', height: '870px', maxWidth: '700px', marginLeft: '190px', marginTop: '80px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto', marginLeft: '150px' }}>
                <Grid container>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Name :
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.name}
                      </Typography>{' '}
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Contact :
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.contact}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Email :
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.email}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Address :
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.address}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Profession :
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.profession}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Brand :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.brand}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Model :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.model}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Make :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.make}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Payment :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.payment}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Insurance :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.insurance}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Remark :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.remarks}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item sx={{ m: 2 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Customer Request :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {vehicleInquiry?.cus_req}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default ViewVehicleInquiry;
