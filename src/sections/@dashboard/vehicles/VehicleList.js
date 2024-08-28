import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Stack,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Skeleton,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import BuildIcon from '@mui/icons-material/Build';

import MaintanceModal from './MaintanceModal';

const VehicleList = ({
  brand,
  model,
  price,
  modelYear,
  description,
  id,
  deleteVehicle,
  ownership,
  isLoading,
  img,
  availability,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) {
    return (
      <>
        <Stack spacing={1} sx={{ m: 2 }}>
          <Skeleton style={{ borderRadius: 18 }} variant="rectangular" width={285} height={450} />
        </Stack>
      </>
    );
  }

  return (
    <>
      <Grid item xs={3} sx={{ m: 2 }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia component="img" height="200" image={`http://127.0.0.1:8000/storage/${img}`} alt="vehicle" />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {brand} {model}
            </Typography>
            <Typography gutterBottom variant="h6" component="div" color="text.secondary">
              LKR {price}.00
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              Model Year : {modelYear}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              Ownership : {ownership}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              {availability === 'true' ? 'For Sale' : 'Sold Out'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions style={{ marginLeft: '8px' }}>
            <IconButton component={RouterLink} to={`/dashboard/update-vehicle/${id}`}>
              <Tooltip title="Update">
                <EditIcon />
              </Tooltip>
            </IconButton>

            <IconButton
              color="error"
              onClick={() => {
                deleteVehicle(id, brand);
              }}
            >
              <Tooltip title="Delete">
                <DeleteIcon />
              </Tooltip>
            </IconButton>

            <IconButton component={RouterLink} to={`/dashboard/view-vehicle/${id}`}>
              <Tooltip title="View">
                <PreviewIcon />
              </Tooltip>
            </IconButton>

            <IconButton onClick={handleOpen}>
              <Tooltip title="Maintenance">
                <BuildIcon />
              </Tooltip>
            </IconButton>
          </CardActions>
        </Card>
        <MaintanceModal open={open} handleClose={handleClose} id={id} setOpen={setOpen} />
      </Grid>
    </>
  );
};

export default VehicleList;
