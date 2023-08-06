const express = require("express");
const https = require("https");
const bodyparser=require("body-parser");
const { stringify } = require("querystring");
const app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function (req, res) {
   res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
     const query = req.body.cityName;
    const appkey="089f96c2e66b58c554f0cb512e00d83b";
    const unit="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+appkey+"&units="+unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            console.log(weatherdata);
            const temp = weatherdata.main.temp
            const weatherdescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather  is " + weatherdescription + "</p>");
            res.write("<h1>The temperature in "+query+" is " + temp + " degree celsius</h1>");

            res.write("<img src=" + imageurl + ">");
            res.send();
        });


});   
})



app.listen(3000, function () {
    console.log("server started");
});