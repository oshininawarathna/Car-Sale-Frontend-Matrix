import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Stack,
  Grid,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'axios';
// material
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import BasicTable from './table';

const AddCustomer = () => {
  return (
    <>
      <Page title="Customer">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              All Customers
            </Typography>
          </Stack>
          <BasicTable />
        </Container>
      </Page>
    </>
  );
};

export default AddCustomer;
