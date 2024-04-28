const express = require("express");
const { scheme } = require("./validation/scheme");
const { checkBody, checkAndCreateID } = require("./validation/validator");
const { readFileSyncUsers, writeFileSyncUsers } = require("./fs/fs");

const users = readFileSyncUsers();

let customId = 0;

const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  res.send({ users });
});

app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user) {
    res.send({ user });
  } else {
    res.send({ error: "User not found" });
  }
});

app.put("/users/:id", checkBody(scheme), (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user) {
    user.firstName = req.body.firstName;
    user.secondName = req.body.secondName;
    user.age = req.body.age;
    user.city = req.body.city;
    writeFileSyncUsers(users);
    res.send({ user });
  } else {
    res.send({ error: "User not found" });
  }
});

app.post("/users", checkBody(scheme), (req, res) => {
  const user = {
    id: checkAndCreateID(customId),
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    age: req.body.age,
    city: req.body.city,
  };
  users.push(user);
  writeFileSyncUsers(users);
  res.send({ user });
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(
    (user) => user.id === Number(req.params.id)
  );
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    writeFileSyncUsers(users);
    res.send({ status: "ok" });
  } else {
    res.send({ error: "User not found" });
  }
});

app.use((req, res) => {
  res.status(404);
  res.send({ error: "Not found" });
});

app.listen(3000, () => console.log("ok"));
