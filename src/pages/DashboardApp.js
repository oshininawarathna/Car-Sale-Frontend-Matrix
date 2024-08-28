import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';

import { Grid, Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';

// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';
import useFetch from '../hooks/useFetch';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { data: vehicleData, isLoading: vehicleLoding } = useFetch('http://127.0.0.1:8000/api/vehicles');
  const { data: staffData, isLoading: staffLoading } = useFetch('http://127.0.0.1:8000/api/staff');
  const { data: swapDealData, isLoading: swapLoading } = useFetch('http://127.0.0.1:8000/api/swapvehicle');
  const { data: currntVist, isLoading: currntVistLoading } = useFetch('http://127.0.0.1:8000/api/currentvisits');

  const [j, setJ] = useState(0);

  const july = currntVist?.currentvisits.filter((jul) => jul.month === 7);

  const august = currntVist?.currentvisits.filter((aug) => aug.month === 8);

  const cars = vehicleData?.Vehicle.filter((car) => car.make === 'Car');

  const vans = vehicleData?.Vehicle.filter((van) => van.make === 'Van');

  const jeeps = vehicleData?.Vehicle.filter((jeep) => jeep.make === 'Jeep');

  const theme = useTheme();

  const percentage = ((july?.length - 8) * 100) / 8;

  useEffect(() => {
    setJ(july?.length);
  }, [july]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Sale Done" color="error" total={2000} icon={'foundation:burst-sale'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Staff"
              total={staffLoading ? 0 : staffData?.staff.length}
              color="info"
              icon={'fa6-solid:people-group'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Item Available"
              total={vehicleLoding ? 0 : vehicleData?.Vehicle.length}
              color="warning"
              icon={'carbon:vehicle-insights'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Swap Deals"
              total={swapLoading ? 0 : swapDealData?.posts.length}
              icon={'fluent:people-swap-20-filled'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Performance"
              subheader={`Site visits (${Math.round(percentage)}%) than last month`}
              chartLabels={[
                '01/02/2022',
                '02/02/2022',
                '03/02/2022',
                '04/02/2022',
                '05/02/2022',
                '06/02/2022',
                '07/02/2022',
                '08/02/2022',
                '09/02/2022',
                '10/02/2022',
                '11/02/2022',
                '12/02/2022',
              ]}
              chartData={[
                {
                  name: 'Sales',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 30],
                },
                {
                  name: 'Site Visits',
                  type: 'area',
                  fill: 'gradient',
                  data: [4, 5, 1, 7, 2, 8, july?.length, august?.length, 0, 0, 0, 0],
                },
                {
                  name: 'Swap Deals',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 15],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Available Vehicles"
              chartData={[
                { label: 'Cars', value: 0 + cars?.length },
                { label: 'Vans', value: 0 + vans?.length },
                { label: 'Jeeps', value: 0 + jeeps?.length },
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.chart.violet[0], theme.palette.chart.yellow[0]]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
