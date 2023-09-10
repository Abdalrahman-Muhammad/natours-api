const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`),
);

const getAllusers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
};

const getUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);
};

const addNewUser = (req, res) => {
  res.status(200).send('test');
};
const updateUser = (req, res) => {
  res.status(200).send('test');
};
const deleteUser = (req, res) => {
  res.status(200).send('test');
};

module.exports = { getAllusers, getUser, addNewUser, updateUser, deleteUser };
