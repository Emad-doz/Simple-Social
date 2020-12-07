import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from '../Main/Home'
import Users from '../User/Users'
import Signup from '../Auth/SignUp'
import Login from '../Auth/Login'
import Profile from '../User/Profile'
import Navbar from '../Main/Navbar'
import EditProfile from '../User/EditProfile'
import PrivateRoute from '../Auth/PrivateRoute'

/*import Login from '../Auth/Login';
import AuthService from '../../services/auth-service';

import Home from '../Main/Home'
import Signup from '../Auth/SignUp'
import Users from '../User/Users'
import Profile from '../User/Profile'*/

const MainRouter = () => {
    return (<div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
      </Switch>
    </div>)
}

export default MainRouter
