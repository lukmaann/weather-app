const express=require('express');
const bodyparser=require("body-parser");
const http=require('https');
const { log } = require('console');
require("dotenv").config();
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render("index");
})
const appid=process.env.APPID;
app.post('/',(req,res)=>{
    const cityName=req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appid+"&units=metric";
    http.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            const city=weatherData.name;
            // const windspeed=weatherData.wind.speed;
            const discription=weatherData.weather[0].description;
            const humidity=weatherData.main.humidity;
            const iconcode=weatherData.weather[0].icon;
            const tempreature=weatherData.main.temp;
            
            const imgUrl="https://openweathermap.org/img/wn/"+iconcode+"@2x.png";

            const today=new Date();
            const currenttime = today.getHours() + ":" + today.getMinutes() ;

            res.render("weather",{cityn:city,temp:tempreature,disc:discription,wind:45,humi:humidity,imgsrc:imgUrl,time:currenttime});
            

        })
    })
})


app.listen(3000,()=>{
    console.log("server started at port 3000");

})

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}