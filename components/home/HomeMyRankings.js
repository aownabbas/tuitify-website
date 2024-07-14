import HomeStatistics from './HomeStatistics';
import classes from './Home.module.css';

import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Image from 'next/image';
import { Grid } from '@mui/material';

const HomeMyRankings = (props) => {
  // { allRankings, stats }
  const root = {
    width: '100%',
    overflowX: 'auto',
    height: '35vh',
    // background: 'red',
    borderRadius: '10px',
    padding: '15px',
  };
  const table = {
    minWidth: 700,
  };
  // const rankingItems = props.allRankings?.items;
  // console.log(rankingItems, 'allRankings user');
  return (
    <div className="row mb-2 ">
      <Grid container spacing={0.7}>
        <Grid item md={10} xs={12} mb={2}>
          <Paper elevation={0} style={root}>
            <div className=" mt-1 bold">
              <h6 className={`card-title ${classes.cardtext}`}>My rankings</h6>
            </div>
            <Table style={table}>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Total Giists (Viewed)</TableCell>
                  <TableCell align="center">Total Giists (Created)</TableCell>
                  <TableCell align="center">Total Viewers (Gained)</TableCell>
                  <TableCell align="center">Total Giist Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.allRankings?.items.map((userRank) => (
                  <TableRow hover key={userRank.id}>
                    <TableCell align="center" component="th" scope="row">
                      {userRank.id}
                    </TableCell>
                    <TableCell align="center">
                      <div className="float">
                        <div className="w-25 ">
                          <Image
                            src="/assets/images/ranking_image.png"
                            height="32px"
                            width="32px"
                            className="img-row"
                          />
                        </div>
                        <div className="w-15 "></div>
                        <div className={`w-50 align-right ${classes.randingUserName}`}>
                          {userRank.first_name} {userRank.last_name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">{userRank.own_tutorial_views_count}</TableCell>
                    <TableCell align="center">{userRank.tutorial_views_count}</TableCell>
                    <TableCell align="center">{userRank.tutorials_count}</TableCell>
                    <TableCell align="center">
                      <div className={`ratingradient text-center`}> {userRank.avg_rating}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item md={2} xs={12} mb={2}>
          {/* <HomeStatistics mystats={props.stats} /> */}
        </Grid>
      </Grid>
    </div>
  );
};

// HomeMyRankings.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default HomeMyRankings;
