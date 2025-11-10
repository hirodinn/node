const url = "https://hirebikila.com";

export function log(message, emitter) {
  console.log(message);
  emitter.emit("messageLogged", { who: message });
}
