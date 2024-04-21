const http = require("http");

let viewAbout = 0;
let viewHead = 0;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    viewHead++;
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`<h1>Say hi</h1>
    <a href="http://localhost:3000/about">About</a>
    <p>Количество просмотров ${viewHead}</p>`);
  } else if (req.url === "/about") {
    viewAbout++;
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`<h1>Say about</h1>
    <a href="http://localhost:3000/">Head</a>
    <p>Количество просмотров ${viewAbout}</p>`);
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`<h1>Not found</h1>`);
  }
});

const port = 3000;

server.listen(port, () => {
  console.log("All right");
});
