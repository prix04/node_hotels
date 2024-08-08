//const addtwo = (a,b) => (a+b)

//console.log(addtwo(9,4));

/*const callback = function(){
    console.log("adding is completed");

}

const add = function(a,b,callback){
    var result = a+b
    console.log("result is : " +result); //main function work complete
    callback();
}
add(5,45, callback)*/
const express = require('express')
const app = express()
const db = require('./db')

const person = require('./models/person')
const menuItem = require('./models/menuItem')
const bodyParser = require('body-parser')
const { log } = require('console')
app.use(bodyParser.json())



app.get ('/',function(req,res){
    res.send('welcome to my hotel...how can I help you?')
})

app.get('/chicken',(req,res)=>{
    res.send('sure sir, I would love to serve chicken')
})

app.post('/person',async (req,res)=>{
    try{
        const data =req.body
        const newPerson = new person(data)

        const response = await newPerson.save();
        console.log('data saved')
        res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

app.get('/person', async (req,res)=>{
    try{
        const data = await person.find()
        console.log('data saved')
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})



app.post('/menuItem',async (req,res)=>{
    try{
        const data =req.body
        const newMenuItem = new menuItem(data)

        const response = await newMenuItem.save();
        console.log('data saved')
        res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

app.get('/person/:workType', async (req,res)=>{
   try{
    const workType = req.params.workType;
    if(workType== "waiter"|| workType == "chef"|| workType =="owner")
        {
            const response = await person.find({work: workType})
            console.log("response fetched")
            res.status(200).json(response);
        }
   else{
    res.status(404).json({error: "invalid work type"})
   }
}
   catch(err){
        console.log(err)
        res.status(500).json({"error" : 'internal server error'})
   }
   
})

app.listen(3000,()=>{
    console.log('listening on port 3000')
})