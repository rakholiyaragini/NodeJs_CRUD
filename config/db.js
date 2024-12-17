const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/RecordCrud')
  .then(() => console.log('DB Connected!')).catch((err) =>{
    console.log("err",err);
  })

module.exports = mongoose;