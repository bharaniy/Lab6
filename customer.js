const fs =  require('fs');
let fetchData = () => {
  try {
    let customerString = fs.readFileSync('customer-data.json')
    return JSON.parse(customerString);
  } catch(e){
    return [];
  }
};

let saveData = (customers) => {
  fs.writeFileSync('customer-data.json',JSON.stringify(customers));
};



let addData = (firstname,lastname,id,email) => {
    let customers = fetchData();
    let customer = {firstname,lastname,id,email}
    let duplicateCustomers = customers.filter((customer) => {
        return customer.firstname === firstname;
    });

    if (duplicateCustomers.length === 0) {
        customers.push(customer);
        saveData(customers);
        return customer
    }
  };

let updateData = (firstname,lastname,id,email) => {
       let first=firstname;
           let last=lastname;
            let customerId=id;
            let mail=email;
        removeData(customerId,first);
        addData(first,last,customerId,mail);

    }
    ;
    let getAll = () => {
        return fetchData();
    };


    let getData = (firstName) => {
        let customers = fetchData();
        let data = customers.filter((customer) => {
            return customer.firstname === firstName;
        });
        return data[0]
    };


    let removeData = (id, firstname) => {
        let customers = fetchData();
        let filteredCustomers = customers.filter((customer) => {
            return (customer.id !== id && customer.firstname !== firstname);
        });
        saveData(filteredCustomers);
        return customers.length !== filteredCustomers.length
    };


    let logData = (customer) => {
        console.log('--');
        console.log(`First Name: ${customer.firstname}`);
        console.log(`Last Name: ${customer.lastname}`);
        console.log(`Customer Id: ${customer.id}`);
        console.log(`Email Id: ${customer.email}`);
    };


    module.exports = {
        addData, getAll, removeData, getData, logData, updateData
    };


