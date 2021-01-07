const bcrypt = require('bcrypt');

const users = [
  {
    name: 'Admin',
    phone: 0000000000,
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    phone: 0000000000,
    email: 'John@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Mary Jane',
    phone: 0000000000,
    email: 'Mary@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
