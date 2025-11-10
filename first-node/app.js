import { EventEmitter } from "events";
const emitter = new EventEmitter();
emitter.on("messageLogged", (arg) => {
  console.log(`${arg.who} logged to the system`);
});
emitter.emit("messageLogged", { who: "hire" });
