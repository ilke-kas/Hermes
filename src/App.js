import Logo from './Logo';
import './App.css';
import {Route, Link} from 'react-router-dom';
import Login from './Components/Login.js';
import Signin from './Components/SignIn.js';
import Customer from './Components/Customer';
import CustomerProfile from './Components/CustomerProfile';
import PackageManager from './Components/PackageManager'
import CourierHomePage from './Components/CourierHomePage';

import CompanyProfile from './Components/CompanyProfile';
import ShipperCourier from './Components/ShipperCourier';


function App() {
  return (
    <div className="App">
      
      <Route exact path="/" component={Login} />
      <Route exact path="/SignIn" component={Signin} />
      <Route exact path="/Customer" component={Customer} />
      <Route exact path="/CustomerProfile" component={CustomerProfile} />

      <Route exact path="/Courier" component={CourierHomePage} />

      <Route exact path="/CompanyProfile" component={CompanyProfile} />
      <Route exact path="/ShipperCourier" component={ShipperCourier} />
      <Route exact path="/PackageManager" component={PackageManager} />

    </div>
  );
}

export default App;
