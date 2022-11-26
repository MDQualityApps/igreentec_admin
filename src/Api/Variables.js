import { v1 as uuidv1 } from 'uuid';



const orderdetails = [
    {
        id: uuidv1(),
        name: 'Customer Name',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Mobile Number',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Services',
        
    },
    {
        id: uuidv1(),
        name: 'Company Name',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Project Name', 
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Project Description'
    },
    {
        id: uuidv1(),
        name: 'Expected Date'
    },
    {
        id: uuidv1(),
        name: 'Project Budget'
    },
    {
        id: uuidv1(),
        name: 'Project Start Date'
    },
    {
        id: uuidv1(),
        name: 'Project Status'
    }
    
]

const emporderdetails = [
    {
        id: uuidv1(),
        name: 'Order Number',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Assigned Date',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Due Date',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Project Status',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Remarks'
    }
    
]

const expensehead = [
    {
        id: uuidv1(),
        name: 'Employee Name',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Expense Type',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Date',
        
    },
    {
        id: uuidv1(),
        name: 'Amount',
        filter: Boolean(true)
    }
]
const orderstatus = [
    {
        id: uuidv1(),
        name: 'Date',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Product Quantity',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Remarks',
        
    },

    
]


const procuredetails = [
    {
        id: uuidv1(),
        name: ' Name',
        // filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'GST Number',
        // filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Project Cost',
        
    },
    {
        id: uuidv1(),
        name: 'Address',
        // filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Lead Time', 
        // filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Documents', 
        // filter: Boolean(true)
    },
    
]

const procureorder = [
    {
        id: uuidv1(),
        name: 'Status Assigned',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Date',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Due Date',
        
    },
    {
        id: uuidv1(),
        name: 'Status',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Remarks', 
        filter: Boolean(true)
    },
    
]
const productdetails = [
    {
        id: uuidv1(),
        name: 'Product Name',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Produst Description',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Product Photos',
        
    },
    {
        id: uuidv1(),
        name: 'Product Quantity',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Product Quality',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Product Stock', 
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Product Price'
    },
    {
        id: uuidv1(),
        name: 'Discount Price'
    },
    {
        id: uuidv1(),
        name: 'Edit'
    },
    {
        id: uuidv1(),
        name: 'Delete'
    }
]



const appendData = (data) => {
    const serverData = new FormData()
    for (var key in data) {
        serverData.append(key, data[key]);
    }
    return serverData
}

export { appendData, orderdetails, productdetails, procureorder, procuredetails, orderstatus, expensehead,emporderdetails }