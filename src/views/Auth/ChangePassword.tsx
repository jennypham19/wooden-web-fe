import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import Page from '@/components/Page';
import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import useNotification from '@/hooks/useNotification';
import { changePasswordSchema } from '@/schemas/auth-schema';
import { forgotPassword } from '@/services/auth-service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Grid from "@mui/material/Grid2";
import logo_auth from "@/assets/images/users/logo-auth.png"
import CommonImage from '@/components/Image/index';

interface IChangePasswordForm {
  password: string;
  confirmPassword: string;
}
export default function ChangePassword() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    getValues,
    trigger,
  } = useForm<IChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
  });
  const password = watch('password');
  const [searchParams] = useSearchParams();
  const [_loading, setLoading] = useBoolean(false);
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const notify = useNotification();
  const [_hasErrors, setHasErrors] = useBoolean(false);
  const [showPassword, setShowPassword] = useBoolean(false);
  const [showConfirmPassword, setShowConfirmPassword] = useBoolean(false);

  useEffect(() => {
    if (password && password?.length === getValues('confirmPassword')?.length) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  
  const onSubmit = (values: IChangePasswordForm) => {
    setLoading.on();
    forgotPassword({
      password: values.password,
      token: searchParams.get('accessToken') || '',
    })
      .then((resp) => {
        if (resp.statusCode === axios.HttpStatusCode.Ok) {
          setHasErrors.off();
          notify({
            message: t('reset_password_successful'),
            severity: 'success',
          });
          navigate(`/${ROUTE_PATH.LOGIN}`);
        } else {
          throw new Error(resp.message);
        }
      })
      .catch((err) => {
        setHasErrors.on();
      })
      .finally(() => {
        setLoading.off();
      });
  };

  return (
    <Page title='Wooden website'>
      <Grid container sx={{ minHeight: '100vh', bgcolor: '#FFFAE4' }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: '100%', display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
          <Box sx={{ flexDirection: 'column', margin: 'auto 0', paddingX: { xs: 2, lg: 0 }, width: { xs: '100%', lg: '50%'} }}>
            <Box>
              <Typography
                component='h1'
                variant='h4'
                fontWeight={500}
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 3.5rem)', mb: 3, fontWeight: 700, fontFamily: 'Kavoon' }}
              >
                Change Password
              </Typography>
              {_hasErrors && (
                <Alert variant='filled' severity='warning'>
                  Sorry, looks like there are some errors detected, please try again.
                </Alert>
              )}
            </Box>
            <Box
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              sx={{ gap: 2 }}
            >
              <Stack mb={2}>
                <Typography fontWeight={600}>Mật khẩu mới</Typography>
                <ControllerTextField<IChangePasswordForm>
                  controllerProps={{
                    name: 'password',
                    defaultValue: '',
                    control: control,
                  }}
                  textFieldProps={{
                    placeholder: 'Mật khẩu mới',
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
              <Stack mb={2}>
                <Typography fontWeight={600}>Xác nhận mật khẩu</Typography>
                <ControllerTextField<IChangePasswordForm>
                  controllerProps={{
                    name: 'confirmPassword',
                    defaultValue: '',
                    control: control,
                  }}
                  textFieldProps={{
                    placeholder: 'Xác nhận mật khẩu',
                    label: '',
                    type: showConfirmPassword ? 'text' : 'password',
                    error: !!errors.confirmPassword,
                    helperText: errors.confirmPassword?.message,
                    slotProps: {
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => setShowConfirmPassword.toggle()}
                              edge='end'
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                  prefixIcon={Lock}
                />                
              </Stack>

              <LoadingButton sx={{ bgcolor: '#416327', borderRadius: 8, height: 50, my: 2}} loading={_loading} type='submit' variant='contained' fullWidth>
                Thay đổi mật khẩu
              </LoadingButton>
            </Box>            
          </Box>

        </Grid>
        <Grid sx={{ height: '100%'}} size={{ xs: 12, md: 6 }}>
          <Box m={3} >
              <CommonImage sx={{ borderRadius: 8 }} src={logo_auth}/>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}
