const path = require("path");

const fs = require("fs");

const filePath = path.join(__dirname, "users.json");

const readFileSyncUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.log(error);
  }
};

const writeFileSyncUsers = (users) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { readFileSyncUsers, writeFileSyncUsers };
