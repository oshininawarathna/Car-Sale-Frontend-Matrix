import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

import { handleLogin } from '../../../services/Auth';

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [passWord, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await handleLogin({
        user_name: `${userName}`,
        password: `${passWord}`,
      });

      if (result?.data.success) {
        localStorage.setItem('name', `${result?.data.data.first_name}  ${result?.data.data.last_name}`);
        localStorage.setItem('email', result?.data.data.email);
        navigate('dashboard/app', { replace: true });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorised !',
        text: 'Please Check username and password. !',
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          type="text"
          label="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label="Password"
          value={passWord}
          onChange={(e) => setPassword(e.target.value)}
          // {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel
          control={<Checkbox checked={remember} {...label} onChange={(e) => setRemember(e.target.value)} />}
          label="Remember me"
        />

        <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        // loading={isSubmitting }
      >
        Login
      </LoadingButton>
    </form>
  );
}
