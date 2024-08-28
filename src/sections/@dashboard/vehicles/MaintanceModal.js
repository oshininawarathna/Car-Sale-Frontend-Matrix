import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField, Stack } from '@mui/material';
import { LoadingButton, DatePicker } from '@mui/lab';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import useFetch from '../../../hooks/useFetch';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export default function MaintanceModal({ open, handleClose, id, setOpen }) {
  const [cost, setCost] = useState();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const { data: vehicleData, isLoading: vehicleLoading } = useFetch(`http://127.0.0.1:8000/api/vehicles/${id}`);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post('http://127.0.0.1:8000/api/maintenances', {
        cost: `${cost}`,
        comment: `${comment}`,
        vehicleid: `${id}`,
        brand: vehicleData?.brand,
        model: vehicleData?.model,
        chassis_no: vehicleData?.chassis_no,
      })
      .then((res) => {
        setLoading(false);
        setMsg('Maintenance Cost Added');
        setTimeout(() => {
          setCost();
          setComment('');
          setOpen(false);
          setMsg('');
        }, 8000);
      })
      .catch((e) => {
        setMsg('Something went wrong !');
      });
  };

  const handleReset = () => {
    setCost();
    setComment('');
    setOpen(false);
    setMsg('');
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Add Maintenance Cost
            </Typography>
          </Stack>
          <Grid style={{ margin: 14 }}>
            <Typography color={msg === 'Maintenance Cost Added' ? '#00FF00' : 'error'}>{msg}</Typography>
          </Grid>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Cost (LKR)"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  type="text"
                  label="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={5} sx={{ m: 2 }}>
              {loading ? (
                <LoadingButton style={{ width: 150 }} size="large" type="submit" disabled variant="contained">
                  Saving
                </LoadingButton>
              ) : (
                <LoadingButton style={{ width: 150 }} size="large" type="submit" variant="contained">
                  Save
                </LoadingButton>
              )}

              <LoadingButton style={{ width: 150, marginLeft: 10 }} size="large" type="reset" variant="outlined">
                Cancel
              </LoadingButton>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
