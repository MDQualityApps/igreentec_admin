import { lazy, useState } from 'react';

// project imports
import { Navigate, useRoutes } from 'react-router-dom'
import React, { Suspense } from 'react'
import Layout from './Layout';
import Dashboard from './Pages/Dashboard';
import Pagenotfound from './Comps/Pagenotfound';
import Login from './Pages/Login';
import MainDashboard from './MainDashboard';
import ProjectEnquiry from './Pages/ProjectEnquiry';
import AllOrders from './Pages/AllOrders';
import OrderList from './Orders/OrderList';
import Addvendor from './Pages/AddVendor';
import Addproduct from './Pages/AddProduct';
import ProductTab from './Pages/ProductTab';
import Productlist from './Pages/Productlist';
import Expenditure from './Pages/Expenditue';
import UserOrder from './Pages/UserOrder';
import Userlogin from './Factoryemp/Userlogin';
import Procurement from './Procurement/Procurement';
import EmpLogin from './Procurement/EmpLogin';
import EmpOrders from './Pages/EmpOrders';




// ==============================|| MAIN ROUTING ||============================== //

//this variable is for local development 
export const startUrl = `/`;


// ==============================|| ROUTING RENDER ||============================== //


function Routes() {
    const auth = localStorage.getItem('auth');
    const [successOpen, setsuccessOpen] = useState(false);
    const [successMessage, setsuccessMessage] = useState('');
    const [successStatus, setsuccessStatus] = useState(false);
    const [successColor, setsuccessColor] = useState(false);


    
        return useRoutes([
            {
                path: `*`,
                element: <Pagenotfound />
            },
            {
                path: startUrl,
                element: <Login  setsuccessOpen={setsuccessOpen} setsuccessMessage={setsuccessMessage} setsuccessStatus={setsuccessStatus} setsuccessColor={setsuccessColor} />
            },
            {
                path: `${startUrl}app`,
                element: auth ? <Layout  successOpen={successOpen} setsuccessOpen={setsuccessOpen} successMessage={successMessage} successStatus={successStatus} successColor={successColor} /> : <Navigate to={startUrl} />,
        
        children: [
         
                { path: `${startUrl}app`, element: <Navigate to={`maindashboard`} /> },
                { path: `logout`, element: <Navigate to={startUrl} /> },
                { path: `maindashboard`, element: <MainDashboard /> },
                { path: `customerdetails`, element: <ProjectEnquiry /> },
                 { path: `addproduct`, element: <Addproduct /> },
                { path: `producttab`, element:  <ProductTab /> },
                { path: `productlist`, element:  <Productlist /> },
               // { path: `producttab/editproduct`, element:  <EditProduct /> },
                { path: `allorder`, element:  <AllOrders /> },
                { path: `allorder/orderlist`, element:  <OrderList /> },
                { path: `addvendor`, element:  <Addvendor/> },
                { path: `expense`, element:  <Expenditure/> },
                { path: `userorder`, element:  <UserOrder /> },
                { path: `userorder/userlogin`, element:  <Userlogin /> }, 
                { path: `emporders`, element:  <EmpOrders /> },
                { path: `emporders/procurement`, element: <Procurement /> },
                { path: `emplogin`, element:  <EmpLogin /> },
        ]}
    ])
     
    }
    
   
    export default Routes

