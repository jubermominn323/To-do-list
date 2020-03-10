const express = require('express');
const app = express();
const fs = require('fs');


app.get('/' , function(req , res) {
    fs.readFile("src/html/index.html" , function(err, data) {
        res.send(data.toString());
    });
    
})

app.get('/api/todos', function(req, res) {
    fs.readFile("src/temp.json", function(err, data) {
        res.send(data.toString())
        
    })
});

app.get('/api/todos/add', function(req,res){
    console.log(req.query);
    if(typeof(req.query.todoname) != undefined && req.query.todoname != "") {
        var todoName = req.query.todoname;
        console.log("There is a valid new todo data")
        console.log(todoName);
        fs.readFile("src/temp.json", function(err,todosData) {
            var todoListData = JSON.parse(todosData);
            console.log(todoListData);
            todoListData.data.push({"title":todoName,"checked":false});
            fs.writeFile("src/temp.json",JSON.stringify(todoListData), function(err,data) {
                res.send("Saved new todo data "+todoName) 
            })
        });
    } else {
        res.send("No valid new todo data")
    }
})
app.get('*', function(req, res) {
    res.send("<h1>Invalid Page</h1>");
});



app.listen(process.env.PORT || 2020, function() {
    console.log("Server Running")
});