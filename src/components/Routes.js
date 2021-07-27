import React,{useState} from 'react'

import {BrowserRouter, Route, Switch} from 'react-router-dom'


import Dashboard from '../Pages/Dashboard'
import Loginadmin from "../Pages/Loginadmin";
import Home from "../Pages/Home";
import Loginexecutive from "../Pages/Loginexecutive";
import Loginmanagement from '../Pages/Loginmanagement';
import Usercreate from "../Pages/Usercreate";
import Admin from "../Pages/Admin";
import Department from '../Pages/Department';
import Factory from "../Pages/Factories";
import Device from "../Pages/Device";
import ProductLine from "../Pages/ProductLine";
import Settings from "../Pages/Settings";
import Fault from "../Pages/FaultReason";
import ProductInfo from "../Pages/ProductInfo";
import ProductionOrder from "../Pages/ProductionOrder";
import ProductCard from "../Pages/ProductCard";
import ProductCalendar from "../Pages/ProductCalendar";
import ProductionSort from "../Pages/ProductionSort";
import Shift from "../Pages/Shift";

const Routes = () => {

    return (

            <Switch>

                <Route path="/Loginmanagement" component={Loginmanagement} />
                <Route path="/Loginexecutive" component={Loginexecutive} />
                <Route path="/Loginadmin" component={Loginadmin}/>
                <Route path="/Home" component={Home}/>
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/Usercreate" component={Usercreate} />
                <Route path="/Admin" component={Admin} />
                <Route path="/Department" component={Department} />
                <Route path="/Factory" component={Factory} />
                <Route path="/Device" component={Device} />
                <Route path="/ProductLine" component={ProductLine} />
                <Route path="/Settings" component={Settings} />
                <Route path="/Fault" component={Fault} />
                <Route path="/ProductInfo" component={ProductInfo} />
                <Route path="/ProductionOrder" component={ProductionOrder} />
                <Route path="/ProductCard" component={ProductCard} />
                <Route path="/ProductCalendar" component={ProductCalendar} />
                <Route path="/ProductionSort" component={ProductionSort} />
                <Route path="/Shift" component={Shift} />

            </Switch>




    )
}

export default Routes