import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Loginuser} from './component/Loginuser'
import { Profile } from './component/Profile';
import { Useregister } from './component/Useregister';
function App() {
  const name= localStorage.getItem("token");
  console.log(name)

  return (
    <div>
       <Router>
       <Switch>
      {
        name!=null ?(
          // <Route exact path="/profile" component={Profile}></Route>
          <Profile/>
          ):(
            <>
            <Route exact path="/" component={Loginuser}></Route>
            <Route exact path="/registerationUser" component={Useregister}></Route>
            </>
            )
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
