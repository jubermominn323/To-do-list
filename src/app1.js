const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 2020;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const ObjectId = require('mongodb').ObjectID;
const url = "mongodb://127.0.0.1:27017";
const databaseName = "todo-db";

app.use(express.static("public"))

MongoClient.connect(url, {useUnifiedTopology:true}, function(err, client) {
    if(err){ console.log("There is some error")
    return
    }
    else
     console.log("Connection Success")

    
app.get('/' , function(req , res) {
    fs.readFile("src/html/index.html" , function(err, data) {
        res.send(data.toString());
    });
})

app.get('/api/todos', function(req, res) {
    db.collection("user").find({}).toArray(function(err, data) {
        res.send(data)
    })
})

db = client.db(databaseName)

app.get('/update', function(req,res) {
    
    //var hex = /[0-9A-Fa-f]{6}/g;
    //var id = (hex.test(id))? ObjectId(id) : id;
    var id = req.query.id;
    var val = req.query.updateVal
    console.log(val);
    db.collection("user").updateOne({"task":"val"},{$set:{"checked":true}}, function(err, res) {
        if(err)
        console.log(err)
        else("updated successfully")
    })
})


app.get('/delete', function(req, res) {
    var delt = req.query.del
  //  var id = req.query.id
    db.collection("user").deleteOne({"task":delt}, function(err, res) {
        if(err)
        console.log(err)
        
    })
    res.send("Success")

})


app.get('/api/todos/add', function(req,res){

    db.collection("user").insertOne({
        "task":`${req.query.todoname}`,
        "checked":false
    })

    db.collection("user").find({"task":`${req.query.todoname}`}).toArray(function(err, data) {
        
        res.send("Data saved Successfully");
            
    })
    
})
    app.get('*', function(req, res) {
        res.send("<h1>Invalid Page</h1>");
    });

})


app.listen( port , () => {
    console.log(`Server Listning at port ${port}`)
});