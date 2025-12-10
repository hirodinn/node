export default function () {
  const err = new Error("can't find genre with the id");
  err.statusCode = 404;
  throw err;
}
