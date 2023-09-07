const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Task = require('./models/task');



const app = express();


app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static('assets'));


app.get('/',async (req,res) => {
    try{
        var tasks = await Task.find({});
        res.render('index',{
            title : "To Do list",
            task_list : tasks
        })
    }
    catch(err){
        console.log("oops! Something went Wrong");
    }
});

app.post('/create-task/',async (req,res) =>{
    
    try{
        var newTask = await Task.create({
            description : req.body.description,
            category : req.body.category,
            date : req.body.date
        });
        console.log("Task added: ",newTask);

    }
    catch(err){
        console.log("oops!Error encountered",err);
    }
    return res.redirect('back');

});

app.post('/delete-task',async (req,res)=>{
    const taskIds = req.body.taskIds;
    try{
        await Task.deleteMany({ _id: { $in: taskIds } });
        console.log("Successfully deleted");
    }
    catch(err){
        console.log("Error in Deleting the task");
    }
    return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log("Error in connecting to the server");
    }

    console.log("Connection Established on port : ",port);
})
