import { useEffect, useState } from 'react';

// material
import { Container, Stack, Typography, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { VehicleList } from '../../sections/@dashboard/vehicles';
// mock

import { getAllVehicle, removeVehicle } from '../../services/Vehicle';

// ----------------------------------------------------------------------

export default function Vehicle() {
  const [vehicle, setVehicle] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAllVehicle = async () => {
    const result = await getAllVehicle();
    setVehicle(result?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllVehicle();
  }, [refresh]);

  const deleteVehicle = async (id, brand) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const result = removeVehicle(id);
        Swal.fire(`${brand}  Deleted!  `, 'Vehicle has been deleted.', 'success');
        setTimeout(() => {
          setRefresh(refresh + 1);
        }, 1000);
      }
    });
  };

  return (
    <Page title="Vehicle">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Vehicles
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/add-vehicle"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Vehicle
          </Button>
        </Stack>

        <Grid container>
          {vehicle?.count === 0
            ? 'Vehicle is not availble !'
            : vehicle?.Vehicle?.slice()
                .reverse()
                .map((item) => (
                  <VehicleList
                    availability={item.availability}
                    img={item.v_image}
                    key={item.id}
                    brand={item.brand}
                    model={item.model}
                    price={item.unit_price}
                    modelYear={item.year_manufacture}
                    description={item.remarks}
                    id={item.id}
                    deleteVehicle={deleteVehicle}
                    ownership={item.ownership}
                    isLoading={loading}
                  />
                ))}
        </Grid>
      </Container>
    </Page>
  );
}
