const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const dataFilePath = path.join(__dirname, "data.json");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Read data from file
const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ users: [] }, null, 2));
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Write data to file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Define a GET route for "/api"
app.get("/api", (req, res) => {
  const data = readData();
  res.json(data);
});

// Define a POST route to add a new user
app.post("/api", (req, res) => {
  const data = readData();
  const newUser = {
    ...req.body.user,
    id: data.users.length ? data.users[data.users.length - 1].id + 1 : 1,
  };
  if (newUser.name && newUser.age && newUser.contact) {
    data.users.push(newUser);
    writeData(data);
    res.json(data);
  } else {
    res.status(400).send("Invalid user data");
  }
});

// Define a PUT route to update an existing user
app.put("/api/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedUser = req.body.user;
  const data = readData();
  const index = data.users.findIndex((user) => user.id === id);
  if (index !== -1) {
    if (updatedUser.name && updatedUser.age && updatedUser.contact) {
      data.users[index] = { ...data.users[index], ...updatedUser };
      writeData(data);
      res.json(data);
    } else {
      res.status(400).send("Invalid user data");
    }
  } else {
    res.status(404).send("User not found");
  }
});

// Define a DELETE route to remove a user
app.delete("/api/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = readData();
  data.users = data.users.filter((user) => user.id !== id);
  writeData(data);
  res.json(data);
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server started on port 5000 Enjoy it");
});
