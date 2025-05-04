import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import ForgotPassword from './components/ForgotPassword';
// import ColorModeSelect from './theme/ColorModeSelect';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import api from "../../Config/api";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  direction: "rtl",
  // backdropFilter:"20%" , // افکت بلور
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "550px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    // backgroundImage:
    //   "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    // backgroundRepeat: "no-repeat",
    // ...theme.applyStyles("dark", {
    //   backgroundImage:
    //     "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    // }),
  },
}));

export default function SignInComponent(props: {
  disableCustomTheme?: boolean;
}) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   
      event.preventDefault(); // جلوگیری از رفرش

      const data = new FormData(event.currentTarget);
      const username = data.get("username");
      const password = data.get("password");

      // اعتبارسنجی اولیه
      if (!username || !password) {
        setEmailError(!username);
        setPasswordError(!password);
        if (!username) setEmailErrorMessage("نام کاربری الزامی است");
        if (!password) setPasswordErrorMessage("رمز عبور الزامی است");
        return;
      }

      try {
        const response = api.get(
          `https://192.168.4.85:3300/api/TokenQuery/Auth?Username=${username}&Password=${password}&FingerPrint=1`
        ).then((res)=>console.log(res)).catch((err)=>console.log(err)
        )
      
        
      } catch (error) {
        console.error("خطای شبکه:", error);
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
        <div dir="rtl" className="hero-banrlogin">
          {/* <CssBaseline enableColorScheme /> */}
          <div className="backdrop-blur-sm">
            <SignInContainer
              dir="rtl"
              direction="column"
              justifyContent="space-between"
            >
              <Card>
                <div dir="rtl">
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: "100%" }}
                  >
                    <span className="font-Byekan text-2xl">ورود</span>
                  </Typography>
                </div>

                <Divider>
                  <span className="font-nastaliqh text-xl">سریر</span>
                </Divider>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  <FormControl>
                    <div dir="rtl">
                      <TextField
                        className="text-right"
                        dir="rtl"
                        label="نام کاربری"
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="username"
                        type="text"
                        name="username"
                        autoFocus
                        fullWidth
                        variant="outlined"
                        color={emailError ? "error" : "primary"}
                      />
                    </div>
                  </FormControl>
                  <FormControl>
                    <div dir="rtl">
                      <TextField
                        dir="rtl"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        label="رمز عبور"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        fullWidth
                        variant="outlined"
                        color={passwordError ? "error" : "primary"}
                      />
                    </div>
                  </FormControl>
                  <div dir="rtl">
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="مرا به خاطر بسپار"
                    />
                  </div>

                  {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    ورود
                  </Button>
                  <Link
                    component="button"
                    type="button"
                    onClick={handleClickOpen}
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                  >
                    رمز عبور خود را فراموش کرده اید؟
                  </Link>
                </Box>
              </Card>
            </SignInContainer>
          </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
