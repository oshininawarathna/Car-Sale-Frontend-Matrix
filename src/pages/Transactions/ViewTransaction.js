import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
import { Icon } from '@iconify/react';
import Page from '../../components/Page';
import { getTransaction } from '../../services/Transaction';

const ViewTransaction = () => {
  const { id } = useParams();

  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  // featching data
  const getTransactionData = async (id) => {
    const result = await getTransaction(id);
    setTransaction(result?.data);
    setLoading(false);
  };
  useEffect(() => {
    getTransactionData(id);
  }, []);

  if (loading) {
    return (
      <>
        <Stack spacing={1} sx={{ marginTop: '100px', marginLeft: '280px' }}>
          <Skeleton style={{ borderRadius: 18 }} variant="rectangular" width={520} height={520} />
        </Stack>
      </>
    );
  }
  return (
    <>
      {' '}
      <Page title=" View Transaction">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              View Transaction
            </Typography>

            <IconButton component={RouterLink} to="/dashboard/transaction">
              <Icon icon="ant-design:rollback-outlined" />
            </IconButton>
          </Stack>
          <Card sx={{ display: 'flex', height: '520px', width: '520px', marginLeft: '250px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Grid container sx={{ marginLeft: '120px' }}>
                  <Grid item sx={{ m: 2 }} xs={4}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Brand :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {transaction?.brand}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={8}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Model :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {transaction?.model}
                      </Typography>
                    </Stack>
                  </Grid>{' '}
                  <Grid item sx={{ m: 2 }}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Make :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {transaction?.make}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={8}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Year Manufacture :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {transaction?.year_manufacture}
                      </Typography>
                    </Stack>
                  </Grid>{' '}
                  <Grid item sx={{ m: 2 }} xs={8}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Year Registration :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {transaction?.year_registration}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={8}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Chassis No :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {transaction?.chassis_no}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={8}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Unit Price :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {transaction?.unit_price}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ m: 2 }} xs={8}>
                    <Stack direction="row">
                      <Typography component="div" variant="h6">
                        Query :
                      </Typography>
                      <Typography component="div" variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        {transaction?.query}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>{' '}
              </CardContent>
            </Box>
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default ViewTransaction;
