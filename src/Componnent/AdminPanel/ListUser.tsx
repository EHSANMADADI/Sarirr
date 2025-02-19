import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Paper,
  Slide,
  TextField,
} from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Delete, Block, RestartAlt, Search } from "@mui/icons-material";
import Swal from 'sweetalert2/dist/sweetalert2.js'

interface User {
  id: number;
  name: string;
  banned: boolean;
}

const usersData: User[] = [
  { id: 1, name: "Ali Ahmadi", banned: false },
  { id: 2, name: "Sara Hosseini", banned: true },
  { id: 3, name: "Reza Karimi", banned: false },
];

const ListUser: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>(usersData);

  const handleSelect = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "لغو",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        Swal.fire({
          text: "کاربر با موفقیت حذف شد",
          icon: "success"
        });
      }
    });
  };
  
  console.log(users);

  const handleBan = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, banned: !user.banned } : user
      )
    );
  };
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleResetPassword = (id: number) => {
    alert(`رمز عبور کاربر ${id} ریست شد!`);
  };
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
          <TableContainer
            component={Paper}
            sx={{ maxWidth: 900, mx: "auto", mt: 3, p: 2 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: 10,
              }}
            >
              <IconButton onClick={() => setShowSearch((prev) => !prev)}>
                <Search />
              </IconButton>
              <Slide
                direction="left"
                in={showSearch}
                mountOnEnter
                unmountOnExit
                
              >
                
                <div dir="rtl">
                  <TextField
                    
                    label="جستوجو"
                    size="small"
                    variant="standard"
                    placeholder="جستجو کاربران..."
                    value={searchQuery}
                    autoFocus
                    fullWidth
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ marginLeft: 1 }}
                  />
                </div>
              </Slide>
            </div>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>انتخاب</TableCell>
                  <TableCell>نام کاربر</TableCell>
                  <TableCell>حذف</TableCell>
                  <TableCell>بن</TableCell>
                  <TableCell>ریست پسورد</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor: user.banned ? "#ffebee" : "inherit",
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelect(user.id)}
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDelete(user.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleBan(user.id)}
                        color={user.banned ? "primary" : "warning"}
                      >
                        <Block />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleResetPassword(user.id)}
                        color="success"
                      >
                        <RestartAlt />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ListUser;
