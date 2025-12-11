export default function () {
  const err = new Error("can't find object with the id");
  err.statusCode = 404;
  throw err;
}
