const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);
}).then((result) => console.log(result));
