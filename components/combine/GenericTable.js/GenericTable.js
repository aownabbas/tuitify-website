import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classes from '../../setting/Setting.module.css';

import Tooltip from '@mui/material/Tooltip';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import classes from './Setting.module.css';
import Image from 'next/image';

// import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';

import COLORS from '../../../public/assets/colors/colors';
import moment from 'moment';
import WebPagination from '../../pagination/WebPagination';
import { useRouter } from 'next/router';
import { List, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import ArrowTooltips from '../../modals/tooltip/Tooltip';

function GenericTable(props) {
  const {
    data,
    columns,
    limit,
    setLimit,
    page,
    count,
    handlePagination,
    getPlatData,
    deleteModal,
    DeletedData,
    notEditableData,
    handleCLick2,
    create,
    setSearchData,
    searchData,
    title,
    createData,
    value,
    view,
    handleClick,
    actionShow,
    setValue,
  } = props;

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
  const router = useRouter();

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="col-md-12 d-flex">
        <div className="col-md-6 p-2 d-flex align-items-center">
          <h2 className="p-2 bold">{title}</h2>
        </div>
        {title == 'Total Giists Created' ||
        title == 'Total Giist Interactions' ||
        title == 'Engagement Rate' ||
        title == 'Total Briif Created' ||
        title == 'Live Sessions' ||
        title == 'Briif Interactions' ||
        title == 'Users Interactions Stats' ||
        title == 'Total Briif Interactions' ? (
          <div className="col-md-6 p-2 px-4 d-flex" style={{ justifyContent: 'end', columnGap: '5px' }}>
            <div className="col-md-6">
              <div className={`px-3   ${classes.categorySearch}`}>
                <input
                  type="search"
                  placeholder="Search title.."
                  value={searchData}
                  onChange={(e) => {
                    setSearchData(e.target.value);
                  }}
                  className="w-100"
                />
                <ArrowTooltips title="Search" placement="top">
                  <span className={' d-flex'}>
                    <Image src="/assets/img/ic_search.svg" alt="search" width="25px" height="25px" />
                  </span>
                </ArrowTooltips>
              </div>
            </div>
            <div className="col-md-1 d-flex justify-content-end  ">
              <List
                component="nav"
                className="p-0 d-flex align-items-center"
                onClick={(e) => {
                  handleClickListItem(e);
                  handleClick();
                }}
              >
                <ArrowTooltips title="Download Csv" placement="top">
                  <span className="item d-flex" style={{ columnGap: '15px' }}>
                    <Image
                      src="/assets/icons/dot.png"
                      alt="add"
                      width={43}
                      height={45}
                      onClick={create}
                      // style={{ opacity: 0.5 }}
                    />
                  </span>
                </ArrowTooltips>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => {
                  handleClose();
                  setValue([]);
                }}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                <MenuItem
                  style={{
                    width: '194px',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(48, 53, 72, 0.2)',
                    borderRadius: '8px',
                    background: '#ffff',
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <div
                    className="shadow5 p-1"
                    style={{
                      cursor: !value?.length ? 'not-allowed' : 'pointer',
                      pointerEvents: !value?.length && 'none',
                    }}
                  >
                    <CSVLink
                      target="_parent"
                      data={value}
                      filename="transactions.csv"
                      style={{
                        textDecoration: 'none',
                        color: 'red',
                        fontSize: '12px',
                      }}
                    >
                      {/* <div className="row"> */}
                      <div className="d-flex justify-content-center align-items-center">
                        <Image src="/assets/icons/csv.png" alt="csv" width="23px" height="23px" />
                        <div className="medium-mid-large text-center ms-2">
                          {!value?.length ? '...loading' : 'Download CSV'}
                        </div>
                      </div>
                    </CSVLink>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
        ) : (
          <div className="col-md-6 p-2 px-4 d-flex" style={{ justifyContent: 'end' }}>
            <div className="col-md-6">
              <div className={`px-2 py-2  ${classes.categorySearch}`}>
                <Image src="/assets/img/ic_search.svg" alt="search" width="30px" height="30px" />
                <input
                  type="search"
                  placeholder="Search title.."
                  value={searchData}
                  onChange={(e) => {
                    setSearchData(e.target.value);
                  }}
                  className="w-100"
                />
                {/* <ArrowTooltips title="Filter" placement="top">
                  <span className="d-flex">
                    <Image src="/assets/img/searchFilter.svg" alt="search" width="40px" height="40px" />
                  </span>
                </ArrowTooltips> */}
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-end  ">
              <span className="regular-small pe-2 d-flex align-items-center medium-mid-large">{createData}</span>
              <ArrowTooltips title={createData} placement="top">
                <span className="d-flex">
                  <Image
                    src="/assets/icons/new/Vector-squre.svg"
                    alt="add"
                    width={20}
                    height={20}
                    onClick={create}
                    style={{ opacity: 0.5 }}
                  />
                </span>
              </ArrowTooltips>
            </div>
          </div>
        )}
      </div>
      <div style={{ opacity: '0.1', border: '1px solid #000000' }}></div>
      <TableContainer component={Paper} checkboxSelection>
        <Table
          sx={{ minWidth: 500 }}
          style={{
            minWidth: 650,
            borderCollapse: 'separate',
            borderSpacing: '0px 7px',
            borderRadius: '0px',
          }}
          aria-label="custom pagination table"
          className="col-12 "
        >
          {/* table heading */}
          <TableHead style={{ cursor: 'pointer' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <div className="regular-small" style={{ opacity: '0.6' }}>
                    {column.title}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {data &&
            data?.items?.map(
              (item, i) => (
                console.log(item.deleted, 'rowww'),
                (
                  <TableBody
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12) !important',
                      },
                    }}
                    key={i}
                  >
                    <ThemeProvider theme={theme}>
                      <TableRow key={item.id}>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align}>
                            <span className="semibold-small bold">
                              {column.id !== 'action' ? (
                                column.id == 'users' ? (
                                  <div
                                    className="d-flex align-items-center semibold-small bold "
                                    style={{ columnGap: '5px' }}
                                  >
                                    {column.img && (
                                      <Image
                                        src={`${awsLink}${item.image}`}
                                        width={40}
                                        height={40}
                                        style={{ borderRadius: '50%' }}
                                      />
                                    )}
                                    {/* {item[column.id]} */}
                                    {item[column.id]?.length > 10
                                      ? item[column.id].substring(0, 10) + '...'
                                      : item[column.id]}
                                  </div>
                                ) : (
                                  <ArrowTooltips title={item[column.id]} placement="top-start">
                                    <div
                                      className="d-flex align-items-center semibold-small bold "
                                      style={{ columnGap: '5px' }}
                                    >
                                      {column.img && (
                                        <Image
                                          src={`${awsLink}${item.image}`}
                                          width={40}
                                          height={40}
                                          style={{ borderRadius: '50%' }}
                                        />
                                      )}
                                      {/* {item[column.id]} */}
                                      {item[column.id]?.length > 10
                                        ? item[column.id].substring(0, 10) + '...'
                                        : item[column.id]}
                                    </div>
                                  </ArrowTooltips>
                                )
                              ) : (
                                <>
                                  {column.edit != true ? (
                                    <span className="item d-flex" style={{ columnGap: '15px' }}>
                                      <ArrowTooltips title="Delete" placement="top">
                                        <span className="d-flex">
                                          <Image
                                            src="/assets/images/trash3.svg"
                                            width="24px"
                                            height="24px"
                                            onClick={() => {
                                              deleteModal(item);
                                            }}
                                          />
                                        </span>
                                      </ArrowTooltips>
                                      {column.seen == true ? (
                                        <span className="item d-flex" style={{ columnGap: '15px' }}>
                                          <ArrowTooltips title="View" placement="top">
                                            <span className="d-flex">
                                              <Image
                                                src="/assets/images/eye.svg"
                                                width="24px"
                                                height="24px"
                                                onClick={() => {
                                                  view(item);
                                                }}
                                              />
                                            </span>
                                          </ArrowTooltips>
                                          <ArrowTooltips title="Edit" placement="top">
                                            <span className="d-flex" style={{ columnGap: '15px' }}>
                                              <Image
                                                src="/assets/images/edit-2.svg"
                                                width="24px"
                                                height="24px"
                                                onClick={() => {
                                                  handleCLick2(item);
                                                }}
                                              />
                                            </span>
                                          </ArrowTooltips>
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                    </span>
                                  ) : (
                                    <span className="item d-flex" style={{ columnGap: '15px' }}>
                                      <ArrowTooltips title="Delete" placement="top">
                                        <span className="d-flex" style={{ columnGap: '15px' }}>
                                          <Image
                                            src="/assets/images/trash3.svg"
                                            width="24px"
                                            height="24px"
                                            onClick={() => {
                                              deleteModal(item);
                                            }}
                                          />
                                        </span>
                                      </ArrowTooltips>
                                      <ArrowTooltips title="Edit" placement="top">
                                        <span className="d-flex" style={{ columnGap: '15px' }}>
                                          <Image
                                            src="/assets/images/edit-2.svg"
                                            width="24px"
                                            height="24px"
                                            onClick={() => {
                                              handleCLick2(item);
                                            }}
                                          />
                                        </span>
                                      </ArrowTooltips>
                                    </span>
                                  )}
                                </>
                              )}
                            </span>
                          </TableCell>
                        ))}
                      </TableRow>
                    </ThemeProvider>
                  </TableBody>
                )
              ),
            )}
        </Table>
        <div className="justify-content-center d-flex mb-3 mt-3">
          <div className="col-md-7 d-flex justify-content-end">
            <WebPagination
              handleChange={handlePagination}
              count={count}
              page={page}
              size="small"
              shape="rounded"
              color="primary"
            />
          </div>

          <div className="col-md-5 d-flex justify-content-end">
            <label className="d-inline-flex align-items-center  semibold-small" style={{ marginRight: '0.5rem' }}>
              Items per pages:
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
                className=" custom-selected custom-select-sm ms-2 text-muted px-2"
                id="__BVID__167"
                style={{
                  background: '#ffff',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  height: '30px',
                  width: '70px',
                  borderRadius: '0.25rem',
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </label>
          </div>
        </div>
      </TableContainer>
    </>
  );
}

export default GenericTable;
