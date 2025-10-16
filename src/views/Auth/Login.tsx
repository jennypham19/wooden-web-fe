import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import Page from '@/components/Page';

import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import useNotification from '@/hooks/useNotification';
import { loginSchema } from '@/schemas/auth-schema';
import { signIn } from '@/services/auth-service';
import { getCurrentUser } from '@/services/user-service';
import { setIsAuth } from '@/slices/auth';
import { setProfile } from '@/slices/user';
import { useAppDispatch } from '@/store';
import { setStorageToken } from '@/utils/AuthHelper';
import Logger from '@/utils/Logger';
import Grid from "@mui/material/Grid2";
import logo_auth from "@/assets/images/users/logo-auth.png"
import CommonImage from '@/components/Image/index';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const { t } = useTranslation('auth');
  const [_loading, setLoading] = useBoolean();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotification();
  const [_error, setError] = useState('');
  const [showPassword, setShowPassword] = useBoolean(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = async (values: LoginFormInputs) => {
    setLoading.on();
    try {
      const respAuth = await signIn({
        email: values.email,
        password: values.password,
      });

      if (respAuth.data?.accessToken) {
        setStorageToken(remember)
          .accessToken(respAuth.data.accessToken)
          .refreshToken(respAuth.data.refreshToken);
        const respUser = await getCurrentUser();
        dispatch(setProfile(respUser.data));
        dispatch(setIsAuth(true));
        setError('');
        notify({
          message: t('login_success'),
          severity: 'success',
        });
        let route = ROUTE_PATH.HOME;
        if (!_.isNull(location.state) && location.state !== ROUTE_PATH.LOGIN) {
          route = location.state;
        }
        navigate(route);
      } else {
        setFocus('email');
        setError(respAuth.message);
        throw new Error(respAuth.message);
      }
    } catch (error: any) {
      Logger.log(error);
    } finally {
      setLoading.off();
    }
  };

  return (
    <Page title='Wooden website'>
      <Grid container sx={{ height: '100vh', bgcolor: '#FFFAE4' }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: '100%', display: 'flex',alignItems: 'center', justifyContent: 'center',}}>
          <Box sx={{ flexDirection: 'column', margin: 'auto 0', width: '50%'}}>
            <Box>
              <Typography
                component='h1'
                variant='h4'
                fontWeight={500}
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 3.5rem)', mb: 3, fontWeight: 700, fontFamily: 'Kavoon' }}
              >
                Welcome back
              </Typography>
              <Typography sx={{ mb: 5, fontFamily: 'Kanit' }}>
                Bạn vui lòng điền thông tin đăng nhập dưới đây !!!
              </Typography>
            </Box>
            {_error && (
              <Alert variant='filled' severity='warning'>
                {_error}
              </Alert>
            )}
            <Box
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                gap: 2,
              }}
            >
              <Stack mb={2}>
                <Typography fontWeight={600}>Email</Typography>
                <ControllerTextField<LoginFormInputs>
                  controllerProps={{
                    name: 'email',
                    defaultValue: '',
                    control: control,
                  }}
                  textFieldProps={{
                    placeholder: 'Email',
                    label: '',
                    error: !!errors.email,
                    helperText: errors.email?.message,
                    sx: { ariaLabel: 'email' },
                  }}
                  prefixIcon={Email}
                />                
              </Stack>

              <Stack>
                <Typography fontWeight={600}>Mật khẩu</Typography>
                <ControllerTextField<LoginFormInputs>
                  controllerProps={{
                    name: 'password',
                    defaultValue: '',
                    control: control,
                  }}
                  textFieldProps={{
                    placeholder: 'Mật khẩu',
                    label: '',
                    type: showPassword ? 'text' : 'password',
                    error: !!errors.password,
                    helperText: errors.password?.message,
                    slotProps: {
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => setShowPassword.toggle()}
                              edge='end'
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                  prefixIcon={Lock}
                />
              </Stack>
              <div>
                <Box>
                  <Typography
                    color='primary'
                    component={RouterLink}
                    to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.FORGOT_PASSWORD}`}
                    sx={{ textAlign: 'end', display: 'block', color: '#000' }}
                  >
                    Quên mật khẩu?
                  </Typography>
                </Box>
              </div>
              <LoadingButton sx={{ bgcolor: '#416327', borderRadius: 8, height: 50, my: 2}} loading={_loading} type='submit' variant='contained' fullWidth>
                Đăng nhập
              </LoadingButton>
              <Button
                fullWidth
                variant='outlined'
                sx={{color: '#416327', border: '1px solid #416327', borderRadius: 8, height: 50}}
              >
                Đăng nhập với google
              </Button>
              <Box mt={5} display='flex' justifyContent='center' alignItems='center' flexWrap='wrap' gap={2}>
                <Typography>Bạn chưa có tài khoản?</Typography>
                <Typography
                  to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.REGISTRATION}`}
                  component={RouterLink}
                  sx={{ color: '#416327'}}
                >
                  Đăng ký tại đây
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid sx={{ height: '100%'}} size={{ xs: 12, md: 6 }}>
          <Box m={3}>
              <CommonImage sx={{ borderRadius: 8 }} src={logo_auth}/>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}
