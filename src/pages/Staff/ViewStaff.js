import { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';

// material
import {
  Card,
  Stack,
  Container,
  Typography,
  IconButton,
  CardMedia,
  Box,
  Grid,
  CardContent,
  Skeleton,
} from '@mui/material';

// ----------------------------------------------------------------------
import { Icon } from '@iconify/react';
import Page from '../../components/Page';

import LoadingLiner from '../../components/LoadingLiner';
import useFetch from '../../hooks/useFetch';

const ViewStaff = () => {
  const { id } = useParams();

  const { data: staffData, isLoading } = useFetch(`http://127.0.0.1:8000/api/staff/${id}`);

  if (isLoading) {
    return (
      <>
        <Stack spacing={1} sx={{ marginTop: '85px', marginLeft: '120px' }}>
          <Skeleton style={{ borderRadius: 18 }} variant="rectangular" width={1000} height={550} />
        </Stack>
      </>
    );
  }
  return (
    <>
      <Page title="View Staff">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              View Staff
            </Typography>

            <IconButton component={RouterLink} to="/dashboard/staff">
              <Icon icon="ant-design:rollback-outlined" />
            </IconButton>
          </Stack>

          <Card sx={{ display: 'flex', height: '600px', maxWidth: '1000px', marginLeft: '80px' }}>
            <CardMedia
              component="img"
              sx={{ width: 300, height: 300, margin: '20px' }}
              image={`http://127.0.0.1:8000/storage/${staffData.image}`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto', margin: '40px' }}>
                <Grid container>
                  <Grid item>
                    <Stack direction="row" xs={12}>
                      <Typography variant="h3" sx={{ mx: 1 }}>
                        {staffData?.first_name} {staffData.last_name}
                      </Typography>{' '}
                    </Stack>{' '}
                  </Grid>
                  <Grid item sx={{ m: 1, marginTop: '50px' }} xs={12}>
                    {' '}
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        DOB
                      </Typography>
                      <Typography variant="h6" sx={{ mx: 6 }}>
                        :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {staffData?.d_o_b}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 1 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Email
                      </Typography>
                      <Typography variant="h6" sx={{ mx: 5 }}>
                        :
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ mx: 2 }}>
                        {staffData?.email}
                      </Typography>
                    </Stack>
                  </Grid>{' '}
                  <Grid item sx={{ m: 1 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        NIC
                      </Typography>{' '}
                      <Typography variant="h6" sx={{ mx: 7 }}>
                        :
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {staffData?.nic}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 1 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Gender
                      </Typography>{' '}
                      <Typography variant="h6" sx={{ mx: 3.2 }}>
                        :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 4 }}>
                        {staffData?.gender}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 1 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Address
                      </Typography>{' '}
                      <Typography variant="h6" sx={{ mx: 2.2 }}>
                        :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 5 }}>
                        {staffData?.address}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 1 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Phone no
                      </Typography>{' '}
                      <Typography variant="h6" sx={{ mx: 1.5 }}>
                        :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 5.4 }}>
                        {staffData?.ph_no}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 1 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Position
                      </Typography>
                      <Typography variant="h6" sx={{ mx: 2.8 }}>
                        :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 4 }}>
                        {staffData?.position}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 1 }}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Shift
                      </Typography>{' '}
                      <Typography variant="h6" sx={{ mx: 6.3 }}>
                        :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {staffData?.shift}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 1 }} xs={12}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Salary
                      </Typography>{' '}
                      <Typography variant="h6" sx={{ mx: 4.5 }}>
                        :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 2.5 }}>
                        Rs {staffData?.salary}
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

export default ViewStaff;
