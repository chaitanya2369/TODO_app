const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/task_db',{
    useNewUrlParser : true,
    useUnifiedTopology : true
});
const  db = mongoose.connection;
db.on('error',console.error.bind(console,'Error in connecting the db'));

db.once('open',function(){
    console.log('Connected to MongoDB successfully');
});

module.exports = db;