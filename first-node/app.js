import fs from "fs";

console.log(fs.readdirSync("./")); //this is the synchronus so that it pauses the function run so it comes before the console displays the finished

fs.readdir("./", (err, files) => {
  console.log(files); //this is asynchrounus so it doesn't pause just start excution and continue to the rest of the code so this comes after the finished statement
});

console.log("finished");
