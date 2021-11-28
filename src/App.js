import './App.css';
import {Route, Link} from 'react-router-dom';
import Login from './Components/Login.js';
import SignUp from './Components/SignUp.js';
import Customer from './Components/Customer';
import CustomerProfile from './Components/CustomerProfile';

import PackageManager from './Components/PackageManager'
import ShipperHomePage from './Components/ShipperHomePage';
import CourierHomePage from './Components/CourierHomePage';
import CompanyProfile from './Components/CompanyProfile';
import ShipperCourier from './Components/ShipperCourier';
import PackageManagerHomePage from './Components/PackageManagerHomePage';
import CompanyHomePage from './Components/CompanyHomePage';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/SignUp" component={SignUp} />
      <Route exact path="/Customer" component={Customer} />
      <Route exact path="/CustomerProfile" component={CustomerProfile} />
      <Route exact path="/Courier" component={CourierHomePage} />
      <Route exact path="/CompanyProfile" component={CompanyProfile} />
      <Route exact path="/ShipperCourier" component={ShipperCourier} />
      <Route exact path="/PackageManager" component={PackageManager} />
      <Route exact path="/Shipper" component={ShipperHomePage} />
      <Route exact path="/PackageManagerHomePage" component={PackageManagerHomePage} />
      <Route exact path="/CompanyHomePage" component={CompanyHomePage} />

    </div>
  );
}

export default App;
