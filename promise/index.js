// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(123);
//   }, 1000);
// }).then((result) => console.log(result));

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("loaded a user from database");
    resolve(1);
  }, 2000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("loaded a user from github");
    resolve(2);
  }, 3000);
});
Promise.race([p1, p2]).then((result) => console.log(result));
