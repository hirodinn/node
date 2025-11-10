import os from "os";
console.log(`free memory in MB: ${os.freemem() / (1024 * 1024)}`);
console.log(os.totalmem());
