import Logo from './Logo';
import './App.css';
import {Route, Link} from 'react-router-dom';
import Login from './Components/Login.js';
import Customer from './Components/Customer';
import CustomerProfile from './Components/CustomerProfile';
import CourierHomePage from './Components/CourierHomePage';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/Customer" component={Customer} />
      <Route exact path="/CustomerProfile" component={CustomerProfile} />
      <Route exact path="/Courier" component={CourierHomePage} />
    </div>
  );
}

export default App;
