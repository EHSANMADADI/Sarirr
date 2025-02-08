import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
export default function HeaderAdmin() {
  const [open, setOpen] = React.useState(false);

  // Toggle the Drawer open/close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1877F2", padding: "5px" }}
      >
        <Toolbar>
          <div className="flex items-center justify-between w-full">
            <Typography
              className="font-nastaliq"
              variant="h3"
              component="div"
              sx={{ flexGrow: 1, fontFamily: "nastaliq" }}
            >
              سریر
            </Typography>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer (Navbar) */}
      <div dir="rtl">
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer}
          sx={{
            "& .MuiDrawer-paper": {
              width: 250,
              backgroundColor: "#6CB4EE",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            },
          }}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            {/* آیتم‌های اصلی */}
            <div>
              <ListItem
                sx={{
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                component={Link}
                to="/"
                onClick={() => setOpen(false)}
              >
                <ListItemText primary="صفحه اصلی" sx={{ color: "white" }} />
              </ListItem>

              <Divider sx={{ backgroundColor: "white" }} />

              <ListItem
                sx={{
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                component={Link}
                to="/AdminPanel/adduser"
                onClick={() => setOpen(false)}
              >
                <ListItemText primary="افزودن کاربر" sx={{ color: "white" }} />
              </ListItem>

              <Divider sx={{ backgroundColor: "white" }} />

              <ListItem
                sx={{
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                component={Link}
                to="/AdminPanel/listuser"
                onClick={() => setOpen(false)}
              >
                <ListItemText primary="لیست کاربران" sx={{ color: "white" }} />
              </ListItem>
            </div>

            {/* آیتم پایین منو */}
            <div>
              <Divider sx={{ backgroundColor: "white" }} />
              <ListItem
                sx={{
                  font: "bold",
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary="احسان مددی" sx={{ color: "white" }} />
              </ListItem>
            </div>
          </List>
        </Drawer>
      </div>
    </Box>
  );
}
