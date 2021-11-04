/**
 * Server for Dot app - sending current Currency and time.
 */

const { time } = require('console');
var http = require('http');
var https = require('https');


//create a server object:

http.createServer(function (req, res) {

  if (req.url == '/currency') {
    https.get('https://currencyapi.net/api/v1/rates?key=DQkO1AHwYWwhZe69gXb5JaiegjpEDYPP9gr7', (resp) => {
      let data = '';
    
      // a data chunk has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // complete response has been received.
      resp.on('end', () => {
        var obj = JSON.parse(data);
        console.log("hello "+ obj.rates);
        res.write("NIS Currency "+JSON.stringify(obj.rates.ILS)+"\n"); //write a response to the client
        var date = new Date();
        var current_hour = date.getHours();
        var current_min = date.getMinutes();
        var current_sec = date.getSeconds();
        res.write("Time "+current_hour+":"+current_min.toString()+":"+current_sec); //write a response to the client
        res.end(); //end the response
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
} else if (req.url == '/time') {
  res.write(new Date().toString()); //write a response to the client
  res.end(); //end the response
}



}).listen(8080); //the server object listens on port 8080