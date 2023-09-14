const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
 
app.post("/",function(req,res){
    var cityName = req.body.city;
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=cdc5f8b6ea5b9b0a4d40d4c5c5e5ed56&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.write("<h1>The temperature in " + cityName + " is " + temp + " degree celsius</h1>");
            res.write("<h1>The weather is currently " + weatherDescription +  "</h1>");
            res.write("<img src=\"http://openweathermap.org/img/wn/"+icon+"@2x.png\">");
            res.send();
            

        });

    });
    
});





app.listen(3000,function(){
    console.log("The Server is running on port 3000");
});