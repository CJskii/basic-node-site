var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    var filePath = "." + req.url;

    if (filePath === "./") {
      filePath = "./index.html";
    } else if (filePath === "./about") {
      filePath = "./about.html";
    } else if (filePath === "./contact-me") {
      filePath = "./contact-me.html";
    }

    fs.readFile(filePath, function (err, data) {
      if (err) {
        // File not found, serve 404.html
        fs.readFile("./404.html", function (err, notFoundData) {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(notFoundData);
          }
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  })
  .listen(8080);
