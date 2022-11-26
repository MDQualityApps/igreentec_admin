// this is for common path for api

// this is for live server 
 //const baseApiurl = `https://mdqualityapps.in/igreen/`;

// this api is for development purpose
const baseApiurl = `https://mdqualityapps.in/igreen/UAT/`;

//product image path
const productpath = `https://mdqualityapps.in/igreen/UAT/products/
`;

// get method
const methodGet = 'GET';

// post method
const methodPost = 'POST';

//Add Customer Details and project details
const addproject = `${baseApiurl}addproject`;

//get order Details
const getorderdetails = `${baseApiurl}getallproject`;

//get Product Details
const getproductdetails = `${baseApiurl}getallproduct`;

//Login api
const login = `${baseApiurl}login`;

// add products
const addproduct = `${baseApiurl}addproduct`;

//get single project

const getsingleproject = `${baseApiurl}getproject`;

//edit product

const editproduct = `${baseApiurl}updateproduct`;

//get product
const getproduct =  `${baseApiurl}getproduct`;

//get Update Products
const getUpdateProducts =  `${baseApiurl}getproduct`;

//update Assigned projects
const updateassignedproject =  `${baseApiurl}updateassignedproject`;

//assign project
const assignproject = `${baseApiurl}assignproject`;

//add vendor
const addvendor = `${baseApiurl}addvendor`;

//Procurement
const procurement = `${baseApiurl}addquotation`;

//get assigned orders
const getassignedorders = `${baseApiurl}getassignedproject`;



export { methodGet, methodPost,login, addproject, getorderdetails, getproductdetails, baseApiurl, productpath, addproduct, getsingleproject, editproduct, getproduct, getUpdateProducts, updateassignedproject, assignproject, addvendor, procurement, getassignedorders }
