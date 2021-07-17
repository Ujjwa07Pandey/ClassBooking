import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import { deleteFromCart } from '../service/cartService';
import firebase from 'firebase';
const useStyles = makeStyles((theme) => ({
  tableHeading: {
    height: 80,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  tableRowBlock: {
    display: 'flex',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  freeSeat: {
    color: theme.palette.secondary.main,
  },
}));

const CartPage = () => {
  const classes = useStyles();

  const [arr, setArray] = useState([]);

  useEffect(() => {
    function fetchData() {
      firebase
        .firestore()
        .collection('cart')
        .onSnapshot((snap) => {
          setArray(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        });
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Box my="2.5rem">
        {/* TIMER SECTION */}

        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box>
            <Typography
              variant="h3"
              gutterBottom
              align="left"
              color="secondary"
            >
              Cart
            </Typography>
          </Box>
        </Box>
        {/* FREE SEATS */}

        {/* TABLE SECTION */}

        <Grid container className={classes.tableHeading} spacing={0}>
          <Grid item lg={2}>
            <Box className={classes.tableRowBlock}>
              <Typography variant="h4" gutterBottom align="center">
                Subject
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={2}>
            <Box className={classes.tableRowBlock}>
              <Typography variant="h4" gutterBottom align="center">
                Date
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={3}>
            <Box className={classes.tableRowBlock}>
              <Typography variant="h4" gutterBottom align="center">
                Time
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={3}>
            <Box className={classes.tableRowBlock}>
              <Typography variant="h4" gutterBottom align="center">
                Availabilty
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={2}></Grid>
        </Grid>

        {arr !== undefined ? (
          <Box>
            {arr.map((day, i) => (
              <Box key={i}>
                <Grid container spacing={0}>
                  <Grid item lg={2}>
                    <Box
                      {...defaultProps}
                      className={classes.tableRowBlock}
                      borderTop={0}
                    >
                      <Typography variant="h6" align="center">
                        {day.data.sub}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={2}>
                    <Box
                      {...defaultProps}
                      className={classes.tableRowBlock}
                      borderTop={0}
                    >
                      <Typography variant="h6" align="center">
                        {day.data.date}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box
                      {...defaultProps}
                      className={classes.tableRowBlock}
                      borderTop={0}
                    >
                      <Typography variant="h6" align="center">
                        {day.data.time}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box
                      {...defaultProps}
                      className={classes.tableRowBlock}
                      borderTop={0}
                    >
                      <Typography variant="h6" align="center">
                        {day.data.seat}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item lg={2}>
                    <Box
                      {...defaultProps}
                      className={classes.tableRowBlock}
                      borderTop={0}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        disableElevation={true}
                        style={{
                          width: 150,
                          textTransform: 'unset',
                        }}
                        onClick={() => deleteFromCart(day.id)}
                      >
                        <Typography variant="h6" align="center">
                          Cancel
                        </Typography>
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        ) : (
          <Box>
            <Typography variant="h5" align="center">
              Loading
            </Typography>
          </Box>
        )}

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          my="1.5rem"
        ></Box>
      </Box>
    </Container>
  );
};

export default CartPage;

/*******************
 ****ADDITIONALS***
 ******************/

const defaultProps = {
  border: 1,
  borderColor: '#172269',
};
