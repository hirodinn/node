export default function () {
  if (!process.env.JWT_SECRET) {
    console.log("The token doesnt exist");
    process.exit(1);
  }
}
