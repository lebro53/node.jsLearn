const { readFileSyncUsers } = require("../fs/fs");

const checkBody = (scheme) => {
  return (req, res, next) => {
    const validResult = scheme.validate(req.body);
    if (validResult.error) {
      return res.status(400).send(validResult.error.details);
    }
    next();
  };
};

const checkAndCreateID = (idUser) => {
  const users = readFileSyncUsers();
  if (users.find((user) => user.id === idUser) === undefined) {
    return idUser;
  } else {
    return checkAndCreateID(idUser + 1);
  }
};

module.exports = { checkBody, checkAndCreateID };
