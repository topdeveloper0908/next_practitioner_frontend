"use client";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Chip, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { FaRegEdit } from "react-icons/fa";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "Info",
    numeric: false,
  },
  {
    id: "Specialty",
    numeric: false,
  },
  {
    id: "Tags",
    numeric: false,
  },
  {
    id: "Links",
    numeric: false,
  },
  {
    id: "Rank",
    numeric: false,
  },
  {
    id: "Review",
    numeric: false,
  },
  {
    id: "Status",
    numeric: false,
  },
  {
    id: "Action",
    numeric: false,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          borderBottom: "1px solid #0077FF",
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.id}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function CustomTable({ data }) {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    setRows(data);
  }, [data]);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    {/**
   *       function writeTable() {
        sorter();
        $('#dataTable').DataTable().destroy();
        var tmp = '';
        mainData.forEach((element) => {
          console.log(element);
          tmp += `<tr id="row_${element.id}">`;
          tmp += `<td>
                    <div class="d-flex profile-img">`
                      if(element.upload == 0) {
                          if (!element.imageURL || element.imageURL == ""){
                              if(element.sex == "Male"){
                                  tmp += ` <img src="https://storage.googleapis.com/msgsndr/WkKl1K5RuZNQ60xR48k6/media/65b5b34a0dbca137ef4f425e.png" width="250" height="250" style="border-radius: .3rem;">`;
                              
                              }
                              else{
                                  tmp += ` <img src="https://storage.googleapis.com/msgsndr/WkKl1K5RuZNQ60xR48k6/media/65b5b34ab7ea181193716085.png" width="250" height="250" style="border-radius: .3rem;">`;
                              }
                          }
                          else{
                              tmp += ` <img src="${element.imageURL}" width="250" height="250" style="border-radius: .3rem;">`;
                          }
                      } 
                      else {
                          tmp += ` <img src="${API_URL}src/${element.imageURL}" width="250" height="250" style="border-radius: .3rem;">`;
                      }
                      tmp +=`
                      <div class="ml-2">
                        <span class="mb-1 d-block font-weight-bold">${element.firstname} ${element.lastname}</span>
                        <span class="d-block" style="margin-bottom: .4rem; line-height: .9rem;">${element.address} ${element.city} ${element.state} ${element.zipcode} ${element.country}</span>
                        <span>${element.phone}</span>
                        <span>${element.email}</span>
                      </div>
                    </div>
                  </td>`;
          tmp += `<td>
                    <div class="tag-wrapper">`;
                      element.specialty.split(',').forEach(subElement => {
                        tmp += `<span class="tag-item">${subElement}</span>`;
                      });
                    tmp += `</div>
                  </td>`;
          tmp += `<td>
                    <div class="tag-wrapper">`;
                      element?.tags?.split(',').forEach(subElement => {
                        tmp += `<span class="tag-item">${subElement}</span>`;
                      });
                    tmp += `</div>
                  </td>`;
          tmp += `<td>
                    <div>
                      <a href="${element.profileLink && element.profileLink != "" ? element.profileLink : "profile1.html?user_id=" + element.id}" target="_blank" class="btn btn-success d-block mb-1" style="font-size: .8rem;">Link to Profile</a>
                      <a href="${element.meetinglink}" class="btn btn-success d-block mb-1" style="font-size: .8rem;">Link to Meeting</a>
                    </div>
                  </td>`;
          tmp += `<td>
                    <div class="star-wrapper">`;
                      for (let index = 0; index < element.rank; index++) {
                        tmp += `<span class="fa fa-star checked"></span>`;
                      }
                    tmp += `</div>
                  </td>`;
          tmp += `<td>
                    <div class="star-wrapper">`;
                      for (let index = 0; index < element.review; index++) {
                        tmp += `<span class="fa fa-star checked"></span>`;
                      }
                    tmp += `</div>
                  </td>`;
          if(element.status == 'active') {
            tmp += `<td>
                      <span class="badge badge-pill badge-success">Active</span>
                    </td>`;
          } else {
            tmp += `<td>
                      <span class="badge badge-pill badge-danger">Pending</span>
                    </td>`;
          }
          tmp += `<td>
                  <div class="d-flex">
                    <button onclick="openEditModal(${element.id})" type="button" class="btn btn-success mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"></path>
                      </svg>
                    </button>
                    <button onclick="openDeleteModal(${element.id})" type="button" class="btn btn-danger">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                      </svg>
                    </button>
                  </div>
                </td>`;
          tmp += `</tr>`;
        });
        $("#tableContent").html(tmp);
        $('#dataTable').dataTable();
      }
     
   */}
                    <TableCell align="left">
                      <div></div>
                    </TableCell>
                    <TableCell align="left">
                      <div>
                        {row.specialty.split(",").map((tag) => (
                          <Chip
                            label={tag}
                            variant="outlined"
                            color="primary"
                            sx={{
                              m: 0.2,
                              fontSize: "0.7rem",
                              padding: "0px",
                              fontWeight: "600",
                            }}
                            size="small"
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div>
                        {row.tags.split(",").map((tag) => (
                          <Chip
                            label={tag}
                            variant="outlined"
                            color="primary"
                            sx={{
                              m: 0.2,
                              fontSize: "0.7rem",
                              padding: "0px",
                              fontWeight: "600",
                            }}
                            size="small"
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell align="left">{row.links}</TableCell>
                    <TableCell align="left">{row.rank}</TableCell>
                    <TableCell align="left">{row.review}</TableCell>
                    <TableCell align="left">
                      <Chip
                        label={row.status}
                        variant="filled"
                        color={
                          row.status === "active" ? "primary" : "secondary"
                        }
                        sx={{
                          m: 0.2,
                          fontSize: "0.7rem",
                          padding: "0px",
                          fontWeight: "700",
                          textTransform: "Capitalize",
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <IconButton
                          variant="contained"
                          sx={{
                            backgroundColor: "#67bc46",
                            color: "white",
                            borderRadius: "7px",
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <FaRegEdit size={20} />
                        </IconButton>
                        <IconButton
                          variant="contained"
                          sx={{
                            backgroundColor: "#DD3444",
                            color: "white",
                            borderRadius: "7px",
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {visibleRows.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={8}>
                    No data
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          sx={{
            alignItems: "center",
          }}
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
