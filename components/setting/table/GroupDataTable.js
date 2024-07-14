import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell , {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import classes from '../Setting.module.css';
import Image from 'next/image';
import Checkbox from '@mui/material/Checkbox';
import COLORS from '../../../public/assets/colors/colors';

import WebPagination from '../../pagination/WebPagination';
import usePagination from '../../pagination/Pagination';

const GroupDataTable = ({ users, selected, setSelected, setPage, PER_PAGE, page, setSuccessModal,setLimit,limit }) => {
  let isItemSelected = '';
  let labelId = '';
  // hover select and array of selected users code
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex == selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  let count = Math.ceil(users.totalItems / PER_PAGE);
  let cardData = usePagination(users.items, users.totalItems, PER_PAGE);

  const handleChange = (e, p) => {
    // setPage(p);
    console.log('eskgskl', p);
    setPage(p);
    cardData.jump(p);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: COLORS.whiteColor,
            color: 'red',
            border: '1px solid black',
          },
        },
      },
    },
  });
  return (
    <div className="col-12" style={{ overflowX: ' hidden', overflowY: 'scroll' }}>
      <TableContainer component={Paper} checkboxSelection style={{ borderRadius: '15px', height: '84%' }}>
        <Table
          sx={{ minWidth: 500 }}
          style={{
            minWidth: 650,
            borderCollapse: 'separate',
            borderSpacing: '0px 5px',
            // paddingLeft: '20px',
            // paddingRight: '20px',
            // borderRadius: '0px',
          }}
          aria-label="custom pagination table"
          className="col-12 "
        >
          {/* table heading */}
          <TableHead style={{ cursor: 'pointer' }}>
            <TableRow>
              <TableCell style={{ width: 60, cursor: 'auto' }}></TableCell>
              <TableCell style={{ width: 160 }}>
                <div className="regular-small" style={{ opacity: "0.6" }}>First Name</div>
              </TableCell>
              <TableCell style={{ width: 160 }}>
                <div className="regular-small" style={{ opacity: "0.6" }}>Last Name</div>
              </TableCell>
              <TableCell style={{ width: 160 }}>
                <div className="regular-small" style={{ opacity: "0.6" }}>Email</div>
              </TableCell>
              <TableCell style={{ width: 160 }}>
                <div className="regular-small" style={{ opacity: "0.6" }}>Position</div>
              </TableCell>
              <TableCell style={{ width: 160 }}>
                <div className="regular-small" style={{ opacity: "0.6" }}>Department</div>
              </TableCell>
              <TableCell style={{ width: 160 }}>
                <div className={`text-truncate ${classes.header}`}>Company Name</div>
              </TableCell>
              <TableCell style={{ width: 160 }}>
                <div className="regular-small" style={{ opacity: "0.6" }}>Phone Num</div>
              </TableCell>
             
              
            </TableRow>
          </TableHead>
          {users
            ? users?.items?.map(
                (row, index) => (
                  (isItemSelected = isSelected(row.id)),
                  (labelId = `enhanced-table-checkbox-${index}`),
                  (
                    <TableBody
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12) !important",
                      },
                    }}
                    >
                      <ThemeProvider theme={theme}>
                        <TableRow
                          style={{ padding: '20px' }}
                          hover
                          onClick={(event) => {
                            handleClick(event, row.id);
                          }}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell
                            padding="checkbox"
                            style={{
                              borderTopLeftRadius: '13px',
                              borderBottomLeftRadius: '13px',
                            }}
                          >
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': '22',
                              }}
                              className="ms-2"
                              size="small"
                              style={{ width: '16px', height: '16px' }}
                            />
                          </TableCell>
                          <TableCell id={labelId} component="th" scope="row" className="p-0">
                            <label htmlFor={row.id} className="w-100 h-100 p-3">
                              <div className="row">
                                 <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 regular-xsmall">
                                  {/* {row.owner} */}

                                  <Tooltip title={`${row.first_name}`} placement="top">
                                    <span
                                      className={`text-truncate semibold-small ${classes.title_name}`}
                                      // style={{ minWidth: '50px' }}
                                    >
                                      {row.first_name}
                                    </span>
                                  </Tooltip>
                                 </div>
                              </div> 
                            </label>
                          </TableCell>
                          <TableCell id={labelId} component="th" scope="row" className="p-0">
                            <label htmlFor={row.id} className="w-100 h-100 p-3">
                              <div className="row"> 
                                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 regular-xsmall">
                                  {/* {row.owner} */}

                                  <Tooltip title={`${row.last_name}`} placement="top">
                                    <span
                                      className={`text-truncate semibold-small ${classes.title_name}`}
                                      // style={{ minWidth: '50px' }}
                                    >
                                      {row.last_name}
                                    </span>
                                  </Tooltip>
                                </div>
                              </div>
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label htmlFor={row.id} className="w-100 h-100 p-3 emailgradient">
                              {/* {row.email} */}
                              <Tooltip title={row.email} placement="top">
                                <span className='semibold-small'>
                                {row.email.length > 10
                                    ? row.email.substring(0, 10) + "..."
                                    : row.email}
                                </span>
                              </Tooltip>
                            </label>
                          </TableCell>
                          
                          <TableCell className="p-0">
                            <label htmlFor={row.id} className="w-100 h-100 p-3">
                              <div className="regular-xsmall short-text d-flex">
                                {/* {row.Briff_created_titile} */}
                                <Tooltip title={row.position} placement="top">
                                  <div>
                                    <span className={`semibold-small ${classes.titles}`}>{row.position}</span>
                                  </div>
                                </Tooltip>
                              </div>
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label htmlFor={row.id} className="w-100 h-100 p-3 ">
                              {/* {row.email} */}
                              <Tooltip title={row.department} placement="top">
                                <span className="text-truncate semibold-small" style={{ minWidth: '20px' }}>
                                  {row.department}
                                </span>
                              </Tooltip>
                            </label>
                          </TableCell>

                          <TableCell className="p-0">
                            <label htmlFor={row.id} className="w-100 h-100 p-3 ">
                              {/* {row.email} */}
                              <Tooltip title={row.company} placement="top">
                                <span className='semibold-small'>{row.company}</span>
                              </Tooltip>
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label htmlFor={row.id} className="w-100 h-100 p-3 ">
                              {/* {row.email} */}
                              <Tooltip title={row.date} placement="top">
                                <span className='semibold-small'>{row.date}</span>
                              </Tooltip>
                            </label>
                          </TableCell>
                        

                        
                        </TableRow>
                      </ThemeProvider>
                    </TableBody>
                  )
                ),
              )
            : ''}
        </Table>
        <div className="justify-content-center d-flex mb-3 mt-3">
          <div className="col-md-7 d-flex justify-content-end">
            <WebPagination
              handleChange={handleChange}
              count={count}
              page={page}
              size="small"
              shape="rounded"
              color="primary"
            />
          </div>

          <div className="col-md-5 d-flex justify-content-end">
            <label
              className="d-inline-flex align-items-center  semibold-small"
              style={{ marginRight: "0.5rem" }}
            >
              Items per pages:
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
                className=" custom-selected custom-select-sm ms-2 text-muted px-2"
                id="__BVID__167"
                style={{
                  background: "#ffff",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  outline: "none",
                  height: "30px",
                  width: "70px",
                  borderRadius: "0.25rem",
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="52">52</option>
              </select>
            </label>
          </div>
        </div>
      </TableContainer>
    </div>
  );
};

export default GroupDataTable;
