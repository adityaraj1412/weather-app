const express= require("express");
const https= require ("https");
const bodyParser=require("body-parser")

const app=express();
app.use(bodyParser.urlencoded({extended: true}))
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
});
app.post("/",function(req,res){

    const query=req.body.cityName;
    const apikey="94f7cbd1590671d01901a0ad1575c58c"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+ unit+""
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData= JSON.parse(data)
            const icon=weatherData.weather[0].icon
            const imgURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            const WeatherDescription=weatherData.weather[0].description
            // console.log(data)  
            // console.log(weatherData);
            const temp=weatherData.main.temp;
            console.log(temp)
            res.write("<p>The weather is currently "+ WeatherDescription+ "</p>")
            res.write("<h1>The temperature in "+ query+" is "+temp+" degree celcius.</h1>")
            res.write("<img src="+ imgURL +">")
            res.send();
        })
    });

})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})