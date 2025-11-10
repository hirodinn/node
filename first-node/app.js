import { EventEmitter } from "events";
import { log } from "./logger.js";
const emitter = new EventEmitter();
emitter.on("messageLogged", (arg) => {
  console.log(`${arg.who} logged to the system`);
});
log("hello hire", emitter);
