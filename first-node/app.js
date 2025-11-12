// import { MyEmitter } from "./logger.js";
// const myEmitter = new MyEmitter();
// myEmitter.on("messageLogged", (arg) => {
//   console.log(`${arg} logged to the system`);
// });
// myEmitter.log("hire");

import http from "http";

const server = http.createServer((req, res) => {
  console.log("server is called");
  if (req.url === "/") {
    res.write("hello world");
    res.end();
  } else if (req.url === "/users") {
    res.write(JSON.stringify(["John", "Cena", "ronaldo"]));
    res.end();
  }
});

server.listen(3000);
console.log("running on 3000...");
