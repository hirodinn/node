// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(123);
//   }, 1000);
// }).then((result) => console.log(result));

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("loaded a user from database");
//     resolve(1);
//   }, 2000);
// });
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("loaded a user from github");
//     resolve(2);
//   }, 3000);
// });
// Promise.race([p1, p2]).then((result) => console.log(result));

// function promise1() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(1);
//     }, 1000);
//   });
// }
// function promise2() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(2);
//     }, 1000);
//   });
// }

// promise1()
//   .then((result) => {
//     console.log(result);
//     return promise2();
//   })
//   .then((result) => console.log(result));

// async function chronological() {
//   console.log("this is before the promise is started");
//   await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("the first promise is resolved");
//       resolve();
//     }, 1000);
//   });
//   console.log("after the promise is returned");
// }
// chronological();

//exercise

async function sendEmail() {
  const customer = await new Promise((resolve) => {
    setTimeout(() => {
      const result = {
        id: 1,
        name: "hire bikila",
        isGold: true,
        email: "email",
      };
      console.log("Customer: ", result);
      resolve(result);
    }, 4000);
  });
  const movies = await new Promise((resolve) => {
    setTimeout(() => {
      const result = ["movie1", "movie2"];
      console.log("Movies: ", result);
      resolve(result);
    }, 4000);
  });
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Email sent...");
    }, 4000);
  });
}
sendEmail();
