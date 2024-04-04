const path = require('path');
const express = require('express');

const port = 3000; 
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ramcharan2k4:vectorbornediseases@minorproject.8khefxy.mongodb.net/Malaria_Disease?retryWrites=true&w=majority").then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log("connection failed",err)
})
const User=require('./src/models/user');
const Patient=require('./src/models/patient');
const Case=require('./src/models/case');
// console.log(mongoose.models);
// const Casecheck = await Case.findOne({ Month:1 });

// console.log(__dirname);
// console.log(__filename);
const app = express();
const static_path = path.join(__dirname,'/src/styles')
const template_path = path.join(__dirname,'/src/views')
// console.log(static_path);
// console.log(template_path);

app.use(express.static(static_path));
app.set("view engine","ejs");
app.set("views",template_path);

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render("login_signup");
})

app.post("/signup", async (req, res) => {
    const registerme = new User();``
    registerme.name = req.body.name;
    let useremail = req.body.email;
    const userform = await User.findOne({ email: useremail });
    
    if (!userform) {
      // console.log("userform " + userform);
      registerme.email = req.body.email;
      let password = req.body.password;
    // console.log(updatedpassword);
    // console.log("updated");
      registerme.password = password;
      // console.log("password");
      const role = "user";
      registerme.role = role;
        // console.log("regis");
        const registered = await registerme.save();
        // console.log("tered");
      
    } else {
      // alert("info", "Email already registered ! Please Login !!");
    }
    res.redirect("/");
    // res.render('index');
});

app.post("/", async (req, res) => {
    const useremail = req.body.email;
    const userpassword = req.body.password;
    console.log(useremail);
    const userform = await User.findOne({ email: useremail });
    console.log(userform);
    // if(userform){let actualpassword = userform.password;}
    if (!userform) {
      // await req.alert("info", "Wrong Credentials! Email not found !! Try Again");
      res.redirect("/");
      // userform.password == userpassword
    } else if(userpassword=== userform.password) {
      if (userform.role === "admin") {
        admin = userform;
        adminid = admin._id;
  
        // console.log(userform);
        // console.log(admin);
        console.log("Correct_Admin");
        res.redirect(`/dashboard_admin/${userform._id}`);
      } else if (userform.role === "user") {
        res.redirect(`patient_form/${userform._id}`);
        console.log("logined");
      }
    } else {
      // await req.alert(
      //   "info",
      //   "Wrong Credentials! Password not found !! Try Again"
      // );
      // console.log(messages);
      console.log("Wrong");
      res.redirect("/");
    }
});

app.get("/patient_form/:id",async(req,res)=>{
  const CurrentUser= await User.findById(req.params.id);
  res.render('patient_form',{CurrentUser})
})

app.post("/patient_form/:id",async(req,res)=>{
  const CurrentUser= await User.findById(req.params.id);
  const newPatient = new Patient();
  
  newPatient.name=req.body.patientName;
  newPatient.age=req.body.age;
  newPatient.district=req.body.district;
  newPatient.gender=req.body.gender;
  newPatient.test=req.body.test;
  newPatient.Symptoms=req.body.symptoms;
  newPatient.date=req.body.date;
  newPatient.volunteer_id=CurrentUser._id;

  const savedPatient= await newPatient.save();

  // const district = newPatient.district;
  // const month = 1+newPatient.date.getMonth();
  // const year = 1900+newPatient.date.getYear();
  // console.log(district)
  const district="amritsar";
  const year=2023;
  const month=1;
  try{
    const CasesUpdate = await Case.findOneAndUpdate(
      { District:district,Year:year,Month:month },
      {
        $inc: {
          Cases:1,
        },
      }
    );
  }catch(err){
    console.log(err);
    const newCase= new Case();
    newCase.District=district;
    newCase.Year=year;
    newCase.Month=month;
    newCase.cases=1;
    console.log(newCase);
    const savedCase = await newCase.save();
  }

  console.log(newPatient);
  res.redirect(`${CurrentUser._id}`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })