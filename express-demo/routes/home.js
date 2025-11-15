import express from "express";

const route = express.Router();

//get

route.get("/", (req, res) => {
  res.send("hello ladies and gentlemen");
});

export default route;
