import { MyEmitter } from "./logger.js";
const myEmitter = new MyEmitter();
myEmitter.on("messageLogged", (arg) => {
  console.log(`${arg} logged to the system`);
});
myEmitter.log("hire");
