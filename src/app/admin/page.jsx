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
import Loading from "@/components/Loading";
import { API_URL } from "@/constants/constants";
import { toast } from "react-toastify";
import EditModal from "@/components/EditModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import * as XLSX from "xlsx";

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
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(true);
  const [data, setData] = React.useState([]);
  const token = Cookies.get("token");
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [editUser, setEditUser] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [deleteUser, setDeleteUser] = React.useState({});
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleEditModal = (user) => {
    setEditUser(user);
    setOpenEditModal(true);
  };

  const handleDeleteModal = (user) => {
    setDeleteUser(user);
    setOpenDeleteModal(true);
  };

  function uploadedDB(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    var excelCheck = true;
    var excelTemplate = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Address",
      "City",
      "State",
      "Zipcode",
      "Country",
      "ImageURL",
      "Specialty",
      "Tags",
      "MeetingLink",
      "Sex",
    ];
    reader.onload = async function (e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: "array" });
      var sheetName = workbook.SheetNames[0];
      var sheet = workbook.Sheets[sheetName];
      var jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      excelTemplate.forEach((element, index) => {
        if (element != jsonData[0][index]) {
          excelCheck = false;
        }
      });
      if (excelCheck == false) {
        toast.error("Invalid Excel Template");
        return;
      } else {
        var objectData = jsonData.map((row) => {
          var obj = {};
          jsonData[0].forEach((key, i) => (obj[key] = row[i]));
          return obj;
        });

        const response = await axios.post(`${API_URL}updateDB`, objectData);
        const result = response.data;
        if (result == "success") {
          toast.success("Data uploaded successfully");
          getData();
        }
      }
    };
    reader.readAsArrayBuffer(file);
  }

  const handleSaveUser = async (newuser) => {
    setIsSubmitting(true);
    await axios
      .post(`${API_URL}update`, newuser, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        toast.success("User updated successfully");
        setOpenEditModal(false);
        // set new data
        let newData = data.map((user) => {
          if (user.id == newuser.id) {
            return newuser;
          }
          return user;
        });
        setData(newData);
        setOpenEditModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update user");
      });
    setIsSubmitting(false);
  };

  const handleDeleteUser = async (userId) => {
    setIsDeleting(true);
    await axios
      .post(
        `${API_URL}remove`,
        {
          id: userId,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("User deleted successfully");
        setOpenDeleteModal(false);
        // set new data
        let newData = data.filter((user) => user.id != userId);
        setData(newData);
        setOpenDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete user");
      });
    setIsDeleting(false);
  };

  const getData = async () => {
    await axios
      .get(`${API_URL}all`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          window.location.href = "/login";
        }
        console.log(err);
      });
    setLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ display: "flex" }}>
      <EditModal
        open={openEditModal}
        handleConfirm={handleSaveUser}
        handleClose={() => setOpenEditModal(false)}
        user={editUser}
        setUser={setEditUser}
        isSubmitting={isSubmitting}
      />
      <ConfirmDeleteModal
        open={openDeleteModal}
        handleConfirm={handleDeleteUser}
        handleClose={() => setOpenDeleteModal(false)}
        isDeleting={isDeleting}
        user={deleteUser}
      />
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
            px: 3,
          }}
        >
          <Stack direction="row" justifyContent={"space-between"}>
            <h3>Practitioner List</h3>
            <input
              style={{
                display: "none",
              }}
              onChange={uploadedDB}
              type="file"
              id="dbUpload"
              accept=".xlsx, .xls, .csv"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                document.getElementById("dbUpload").click();
              }}
            >
              Upload Excel
            </Button>
          </Stack>
          <Box sx={{ my: 2 }}>
            <CustomTable
              data={data}
              handleEditModal={handleEditModal}
              handleDeleteModal={handleDeleteModal}
            />
          </Box>
        </Box>
      </Main>
    </Box>
  );
}

const Sidebar = ({ open, handleDrawerClose, theme, setPage }) => {
  const buttons = [
    {
      name: "Home",
      icon: House,
      onClick: () => setPage("home"),
    },
    {
      name: "Add Practitioner",
      icon: Add,
      onClick: () => setPage("add"),
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
