import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Pagination from '@material-ui/lab/Pagination';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { addToCart } from '../service/cartService';

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

const BookingPage = () => {
  const classes = useStyles();

  const [timeLeft, setTime] = useState(getRandom(30, 60));
  const [cart, setCart] = useState(0);
  const [freeSeats, setSeats] = useState(getRandom(5, 15));
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const [arr, setArray] = useState([]);
  const [seatArray, setSeatArray] = useState();
  const [cartItems, setCartItems] = useState([]);
  const dayArray = ['Mon', 'Wed', 'Fri', 'Sat'];
  const subjectArray = ['Python', 'Java', 'HTML', 'HTML'];

  const timeArray = [
    '04:00pm - 05:00pm',
    '05:00pm - 06:00pm',
    '09:00am - 10:00am',
    '09:00am - 10:00am',
  ];

  useEffect(() => {
    let i = 0;
    let count = 0;
    let array = [];
    let seat_array = [];
    while (count < 60) {
      if (dayArray.includes(moment().add(i, 'days').format('ddd')) === true) {
        array.push(i);
        seat_array.push(getRandom(5, 15));
        count++;
      }
      i++;
    }
    setArray(array);
    for (let i = 0; i < 4; i++) {
      let random_array = [15, 30, 45];
      let j = 0;
      while (j < 5) {
        let ran = getRandom(15 * i, 15 * i + 15);
        if (random_array.includes(ran) === false) {
          j++;
          seat_array[ran] = 0;
          random_array.push(ran);
        }
      }
    }
    setSeatArray(seat_array);
  }, []);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTime(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (cart === 3) {
      setOpen(true);
    }
  }, [cart]);

  const PageChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (day, sub, date, time, seat) => {
    addToCart(sub, date, time, seat);
    setCart(cart + 1);
    setCartItems([...cartItems, day]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="warning">
          You can only book maximum 3 classes per week
        </Alert>
      </Snackbar>
      <Box my="2.5rem">
        {/* TIMER SECTION */}

        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              align="left"
              style={{ fontWeight: 'bold' }}
            >
              Time Left : {timeLeft} seconds
            </Typography>
            <Typography
              variant="h3"
              gutterBottom
              align="left"
              color="secondary"
            >
              Claim Your Free Trial Class
            </Typography>
          </Box>
          <Box component={Link} to="/cart">
            <Box
              width="20px"
              height="20x"
              borderRadius={50}
              bgcolor="#000"
              color="#fff"
              marginLeft="1.5rem"
            >
              <Typography variant="body2" gutterBottom align="center">
                {cart}
              </Typography>
            </Box>
            <ShoppingCartOutlinedIcon
              fontSize="large"
              style={{ marginTop: -15 }}
            />
          </Box>
        </Box>
        {/* FREE SEATS */}
        <Box
          mt="1.5rem"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Typography
            variant="h5"
            gutterBottom
            align="left"
            style={{ fontWeight: 'bold' }}
            color="primary"
          >
            Class Schedule
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            align="left"
            style={{ fontWeight: 'bold' }}
          >
            Free Seats : <span className={classes.freeSeat}>{freeSeats}</span>
          </Typography>
        </Box>

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

        {arr.slice((page - 1) * 15, page * 15).map((day, i) => (
          <Box key={i}>
            <Grid container spacing={0}>
              <Grid item lg={2}>
                <Box
                  {...defaultProps}
                  className={classes.tableRowBlock}
                  borderTop={0}
                >
                  <Typography variant="h6" align="center">
                    {
                      subjectArray[
                        dayArray.indexOf(
                          moment().add(day, 'days').format('ddd')
                        )
                      ]
                    }
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
                    {moment().add(day, 'days').format('ddd MMM Do YY')}
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
                    {
                      timeArray[
                        dayArray.indexOf(
                          moment().add(day, 'days').format('ddd')
                        )
                      ]
                    }
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
                    {cartItems.includes(day) === true
                      ? seatArray[(page - 1) * 15 + i] - 1
                      : seatArray[(page - 1) * 15 + i]}{' '}
                    Seats Available
                  </Typography>
                </Box>
              </Grid>

              <Grid item lg={2}>
                <Box
                  {...defaultProps}
                  className={classes.tableRowBlock}
                  borderTop={0}
                >
                  {seatArray[(page - 1) * 15 + i] === 0 ? (
                    <Button
                      variant="contained"
                      disableElevation={true}
                      style={{
                        width: 150,
                        backgroundColor: '#D11E00',
                        textTransform: 'unset',
                        color: '#fff',
                      }}
                    >
                      <Typography variant="h6" align="center">
                        Full
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      disableElevation={true}
                      style={{
                        width: 150,
                        textTransform: 'unset',
                      }}
                      disabled={cart === 3 ? true : false}
                      onClick={() => {
                        const sub =
                          subjectArray[
                            dayArray.indexOf(
                              moment().add(day, 'days').format('ddd')
                            )
                          ];
                        const date = moment()
                          .add(day, 'days')
                          .format('ddd MMM Do YY');
                        const time =
                          timeArray[
                            dayArray.indexOf(
                              moment().add(day, 'days').format('ddd')
                            )
                          ];
                        const seat = seatArray[(page - 1) * 15 + i];

                        if (cartItems.includes(day) === false) {
                          handleClick(day, sub, date, time, seat);
                        }
                      }}
                    >
                      <Typography variant="h6" align="center">
                        {cartItems.includes(day) === true
                          ? 'Booked'
                          : 'Book Now'}
                      </Typography>
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          my="1.5rem"
        >
          <Pagination
            count={4}
            color="secondary"
            page={page}
            onChange={PageChange}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default BookingPage;

/*******************
 ****ADDITIONALS***
 ******************/

const defaultProps = {
  border: 1,
  borderColor: '#172269',
};
const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
