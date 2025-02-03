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
import { ImTextColor } from "react-icons/im";

export default function HeaderAdmin() {
  const [open, setOpen] = React.useState(false);

  // Toggle the Drawer open/close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1877F2", padding: "5px" }}>
        <Toolbar>
          <div className="flex items-center justify-between w-full">
            <Typography className="font-nastaliq" variant="h3" component="div" sx={{ flexGrow: 1, fontFamily: "nastaliq" }}>
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
              backgroundColor: "#6CB4EE", // Adjust the background color as needed
              textAlign: "center",
            },
          }}
        >
          <List
            sx={{
              "& .MuiDrawer-paper": {
                width: 250,
                display: "flex", // Set the drawer to be a flex container
                flexDirection: "column", // Align items in a column
                justifyContent: "center", // Center items vertically
                alignItems: "center", // Center items horizontally
              },
            }}
          >
            <ListItem component="a" href="#">
              <ListItemText primary="اصلی" sx={{ color: "white" }} />
            </ListItem>
            <ListItem component="a" href="#">
              <ListItemText primary="About" sx={{ color: "white" }} />
            </ListItem>
            <ListItem component="a" href="#">
              <ListItemText primary="Services" sx={{ color: "white" }} />
            </ListItem>
            <ListItem component="a" href="#">
              <ListItemText primary="Contact" sx={{ color: "white" }} />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </Box>
  );
}
