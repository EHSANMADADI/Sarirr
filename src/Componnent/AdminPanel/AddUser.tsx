import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { styled } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
}

export default function AddUser() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  // مقداردهی اولیه `errors`
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    let tempErrors: Partial<FormData> = {};

    if (!formData.firstName) tempErrors.firstName = "نام الزامی است";
    if (!formData.lastName) tempErrors.lastName = "نام خانوادگی الزامی است";
    if (!formData.userName) tempErrors.userName = "نام کاربری الزامی میباشد";
    if (!formData.email) {
      tempErrors.email = "ایمیل الزامی است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "ایمیل نامعتبر است";
    }
    if (formData.password.length < 6)
      tempErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted", formData);
    }
  };

  const theme = () =>
    createTheme({
      direction: "rtl",
      // palette: {
      //   mode: palette.mode,
      // },
    });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Container maxWidth="md">
            <Box
              sx={{
                p: 4,
                mt: 5,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h5" mb={3}>
                فرم ثبت‌ نام
              </Typography>
              {/* <Typography variant="h5" mb={3}>
                افزودن کاربر جدید
              </Typography> */}
              <Divider>
                <span className="font-nastaliqh text-xl">سریر</span>
              </Divider>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="نام"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  margin="normal"
                  autoFocus
                  variant="filled"
                />
                <TextField
                  fullWidth
                  label="نام خانوادگی"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  margin="normal"
                  variant="filled"
                />
                <TextField
                  fullWidth
                  label="نام کاربری"
                  name="username"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.userName}
                  helperText={errors.userName}
                  margin="normal"
                  variant="filled"
                />
                <TextField
                  fullWidth
                  label="ایمیل"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  margin="normal"
                  variant="filled"
                />
                <TextField
                  fullWidth
                  label="رمز عبور"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  margin="normal"
                  variant="filled"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  ثبت‌ نام
                </Button>
              </form>
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
