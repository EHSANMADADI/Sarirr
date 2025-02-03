import { createTheme } from "@mui/material/styles";

const AppTheme = createTheme({
  direction: "rtl", // فعال کردن حالت راست‌چین
  typography: {
    fontFamily: "IranSans, Arial, sans-serif", // فونت سفارشی (در صورت نیاز تغییر دهید)
  },
});

export default AppTheme;
