import Logo from './Logo';
import './App.css';
import {Route, Link} from 'react-router-dom';
import Login from './Components/Login.js';
import Customer from './Components/Customer';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/Customer" component={Customer} />
    </div>
  );
}

export default App;
