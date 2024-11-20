const express = require('express');
const app = express();

app.use(express.json());

const Employers = [
    {
        ID:1,
        Name:"Deepika Bansal",
        Department:"IT",
        Salary:75000
    },
    {
        ID:2,
        Name:"John S",
        Department:"Finance",
        Salary:70000
    },
    {
        ID:3,
        Name:"George Smith",
        Department:"HR",
        Salary:80000
    },
    {
        ID:4,
        Name:"Robert Zane",
        Department:"Marketing",
        Salary:69000
    }
];

console.log(Employers)

//Get Employers Data
app.get('/employers',(req,res)=>{
    if(!Employers) res.status(404).send('No Data Found');
    return res.json(Employers);
})

// Add an Employer to your data
app.post('/employers',(req,res)=>{
    if(!req.body.Name) res.send('Please provide a name');
    var employer = {
        ID: Employers.length+1,
        Name:req.body.Name,
        Department:req.body.Department,
        Salary:req.body.Salary
    }
    Employers.push(employer)
    return res.send(Employers)
})

//update an employer data
app.put('/update_employer/:id',(req,res)=>{
    let employer_id = req.params.id;
    if(!req.body.Name) res.send('Please Provide a Updated Name');
    let employer = Employers.find(x=>x.ID==employer_id);
    if(!employer) res.send('Employer not found')
    employer.Name = req.body.Name;
    return res.status(200).json(employer);
})

//delete an employer 
app.delete('/delete_employer/:id',(req,res)=>{
    let employer_id = req.params.id;
    let employer = Employers.find(x=>x.ID == employer_id);
    if(!employer) res.send('Employer not found');
    let index = Employers.indexOf(employer);
    Employers.splice(index,1);
    return res.send(Employers);
})

app.listen(3000,()=>{
    console.log('Server is running')
})