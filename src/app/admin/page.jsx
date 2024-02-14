"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Button, Stack } from "@mui/material";
import { Add, House, Logout } from "@mui/icons-material";
import CustomTable from "@/components/CustomTable";
import axios from "axios";
import Cookies from "js-cookie";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default function Admin() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [data, setData] = React.useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get("token");

  React.useEffect(() => {
    axios
      .get(`${API_URL}all`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        // if 403, redirect to login
        if (err.response.status === 403) {
          window.location.href = "/login";
        }
      });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Sidebar open={open} handleDrawerClose={handleDrawerOpen} theme={theme} />
      <Main open={open}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            p: 1,
            backgroundColor: "#237EEE",
            color: "white",
            ":hover": {
              backgroundColor: "#237EEE",
            },
            borderRadius: "7px",
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Box
          sx={{
            mt: 3,
            px: 5,
          }}
        >
          <Stack direction="row" justifyContent={"space-between"}>
            <h3>Practitioner List</h3>
            <Button variant="contained" color="primary">
              Upload Excel
            </Button>
          </Stack>
          <Box sx={{ my: 2 }}>
            <CustomTable data={data} />
          </Box>
        </Box>
      </Main>
    </Box>
  );
}

const Sidebar = ({ open, handleDrawerClose, theme }) => {
  const buttons = [
    {
      name: "Home",
      icon: House,
      onClick: () => {},
    },
    {
      name: "Add Practitioner",
      icon: Add,
      onClick: () => {},
    },
    {
      name: "Sign out",
      icon: Logout,
      onClick: () => {
        Cookies.remove("token");
        window.location.href = "/login";
      },
    },
  ];
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#32373d",
          color: "white",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          backgroundColor: "#24262A",
          p: 5,
          pt: 9,
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://biohackingcongress.com/storage/users/June2023/9Q67Ebbs5rPLWWmWGZET.png"
          sx={{ width: 100, height: 100 }}
        />
        <Typography
          variant="h1"
          color="white"
          sx={{
            fontSize: "1.1em",
            fontWeight: "500",
            color: "white",
          }}
        >
          Administrator
        </Typography>
      </Box>
      <List
        sx={{
          p: 0,
        }}
      >
        {buttons.map((btn, index) => (
          <ListItem key={btn.name} disablePadding>
            <ListItemButton
              sx={{
                py: 1.5,
                ":hover": {
                  backgroundColor: "dodgerblue",
                },
                justifyContent: "flex-start",
                borderBottom: "1px solid #F0F7FF16",
              }}
              onClick={btn.onClick}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <btn.icon />
              </ListItemIcon>
              <ListItemText primary={btn.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};