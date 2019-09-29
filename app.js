const fs =  require('fs');
const yargs = require('yargs');
const customer = require('./customer.js');

const firstnameOptions = {
    describe: 'First Name of Customer',
    demand : true,
    alias : 'f'
}

const lastnameOptions = {
    describe: 'Last Name of Customer',
    demand : true,
    alias : 'l'
}

const emailOptions = {
    describe: 'Email ID of customer',
    demand : false,
    alias : 'e'
}
const idOptions = {
    describe: 'ID of Customer',
    demand : true,
    alias : 'i'
}

const argv =  yargs

    .command('add','Add a new customer',{
      firstname: firstnameOptions,
       lastname: lastnameOptions,
       email: emailOptions,
        id:idOptions
    })
    .command('list','List all Customers')
    .command('read','Read a customer info',{
        firstname: firstnameOptions,
    })
    .command('remove','Remove a Customer info',{
        firstname: firstnameOptions,
        id:idOptions
    })
    .command('update','Update a Customer info',{
        firstname: firstnameOptions,
        lastname: lastnameOptions,
        email: emailOptions,
        id: idOptions
    })
    .help()
    .argv;




let command = yargs.argv._[0];


if (command === 'add'){
    let customers = customer.addData(argv.firstname,argv.lastname,argv.id,argv.email);
    if (customers){
        customer.logData(customers);
    } else{
      console.log("Customer already exists");
    }
}

else if (command === 'list') {
    let Data = customer.getAll();
  console.log(`Printing ${Data.length} customers(s).`);
    Data.forEach((customers)=>{
        customer.logData(customers);
  });
}

else if (command === 'read') {
   let customers = customer.getData(argv.firstname);
   if(customers){
       customer.logData(customers);
          }
   else{
    console.log("customer not found");
   }
}
else if (command === 'remove') {
    let customerRemoved = customer.removeData(argv.id);
    let message = customerRemoved ? 'Customer was removed' : 'Customer not found';
    console.log(message);
}
else if (command === 'update') {
        let customerUpdated = customer.updateData(argv.firstname,argv.lastname,argv.id,argv.email);
        let message = customerUpdated ? 'Customer not updated' : 'Customer was updated';
        console.log(message);
}

else{
  console.log('command recognized');
}
