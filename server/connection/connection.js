const mongoose = require('mongoose');

const connection = async ()=> {
    try {
         await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log('mongo db connected')
    } catch (error) {
         console.log('mongodb not connected')
    }
   
}

connection();

