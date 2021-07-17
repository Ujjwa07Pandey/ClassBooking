import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BookingPage from './pages/BookingPage';
import CartPage from './pages/CartPage';
import NotFound from './pages/404';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './styles/theme';
import './styles/App.css';
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <BookingPage />
            </Route>
            <Route exact path="/cart">
              <CartPage />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
