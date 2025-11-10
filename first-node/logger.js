import { EventEmitter } from "events";
export class MyEmitter extends EventEmitter {
  log(message) {
    this.emit("messageLogged", message);
  }
}
const url = "https://hirebikila.com";
